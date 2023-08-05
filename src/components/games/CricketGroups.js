import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CricketStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const CricketGroups = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [groupData, setGroupData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

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
        const response = await axios.get(
          `https://snakeladder1.azurewebsites.net/getAllGroupsOfCric?limit=${itemsPerPage}`
        );
        // Sort the data based on the latest created groups (assuming there's a field 'createdTime' for timestamp)
        const sortedData = response.data.sort(
          (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
        );
        setGroupData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally, you can set some error state or show an error message
      }
    };
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000); // Fetch every 3 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [itemsPerPage]);

  const handleView = (groupId) => {
    navigate(`/cricket/groupsData/players?groupId=${groupId}`);
  };

  // Display a "No data found" message if there is no data available
  if (groupData.length === 0) {
    return <div>No data found</div>;
  }

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = groupData.slice(indexOfFirstItem, indexOfLastItem);
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
            <th className="table-header">TableID</th>
            <th className="table-header">GroupId</th>
            <th className="table-header">Ball</th>
            <th className="table-header">isMatchOver</th>
            <th className="table-header">players</th>
            <th className="table-header">Date&Time</th>
            <th className="table-header">View</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item._id}>
              <td className="table-cell">{startSerialNumber + index}</td>
              <td className="table-cell">{item.tableId}</td>
              <td className="table-cell">{item._id}</td>
              <td className="table-cell">{item.ball}</td>
              <td className="table-cell">{item.isMatchOver.toString()}</td>
              <td className="table-cell">{item.group.length}</td>
              <td className="table-cell">
                {formatDateToIndianLocale(item.createdTime)}
              </td>
              <td className="table-cell">
                <button
                  className="button userHistory-button"
                  onClick={() => handleView(item._id)}
                >
                  <i className="fas fa-eye"></i> View
                </button>
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
          disabled={
            indexOfLastItem >= groupData.length ||
            currentItems.length < itemsPerPage
          }
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CricketGroups;
