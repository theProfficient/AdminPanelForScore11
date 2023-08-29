import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CricketStyle.css';
import { useLocation } from "react-router-dom";
import Footer from '../../components/Footer'

const CricketData = () => {
  const location = useLocation();

  const [cricketData, setCricketData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setItemsPerPage] = useState(8);

   // Helper function to convert date to Indian format
   const formatDateToIndianLocale = (dateString) => {
    if (!dateString) {
      return "Date not found";
    }

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "Asia/Kolkata", // Indian time zone
    };

    try {
      // Convert the ISO 8601 date string to a Date object
      const dateObject = new Date(dateString);

      // Check if the dateObject is valid
      if (isNaN(dateObject)) {
        throw new Error("Invalid date format");
      }

      // Convert from UTC to IST (Indian Standard Time)
      const ISTDateString = dateObject.toLocaleString("en-IN", options);

      return ISTDateString;
    } catch (error) {
      console.error(`Error formatting date: ${error.message}`);
      return "Invalid Date";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://snakeladder1.azurewebsites.net/tables?limit=${itemsPerPage}`);
        const sortedData = response.data.data.sort(
          (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
        );
        setCricketData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000); // Fetch every 2 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [itemsPerPage]);

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  if (cricketData === null) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cricketData.slice(indexOfFirstItem, indexOfLastItem);
  const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;

  return (
    <div>
      <div className="items-per-page-label">
        <label
          htmlFor="items-per-page-select"
          style={{ textDecorationColor: "aqua", color: "#4F378B" }}
        >
          Items per page:
        </label>
        <select
          id="items-per-page-select"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={8}>8</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={100}>500</option>
          <option value={100}>1000</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Sr. No.</th>
            <th className="table-header">TableId</th>
            <th className="table-header">EntryFee</th>
            <th className="table-header">Prize</th>
            <th className="table-header">Time(minutes)</th>
            <th className="table-header">Players</th>
            <th className="table-header">Status</th>
            <th className="table-header">EndTime</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((table, index) => (
            <tr key={table._id}>
              <td className="table-cell">{startSerialNumber + index}</td>
              <td className="table-cell">{table._id}</td>
              <td className="table-cell">{table.entryFee}</td>
              <td className="table-cell">{table.prizeAmount}</td>
              <td className="table-cell">{table.maxTime}</td>
              <td className="table-cell">{table.players}</td>
              <td className="table-cell">{table.status}</td>
              <td className="table-cell">
                {formatDateToIndianLocale(table.endTime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="button"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="button"
          onClick={goToNextPage}
          disabled={indexOfLastItem >= cricketData.length}
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default CricketData;
