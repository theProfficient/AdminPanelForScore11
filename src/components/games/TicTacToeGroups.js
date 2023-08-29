import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CricketStyle.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer'

const TicTacToeGroups = () => {
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Helper function to convert date to Indian format
  const formatDateToIndianLocale = (dateString) => {
    if (!dateString) {
      return 'Date not found';
    }

    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata', // Indian time zone
    };

    try {
      // Convert the ISO 8601 date string to a Date object
      const dateObject = new Date(dateString);

      // Check if the dateObject is valid
      if (isNaN(dateObject)) {
        throw new Error('Invalid date format');
      }

      // Convert from UTC to IST (Indian Standard Time)
      const ISTDateString = dateObject.toLocaleString('en-IN', options);

      return ISTDateString;
    } catch (error) {
      console.error(`Error formatting date: ${error.message}`);
      return 'Invalid Date';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getAllGroupsOfTicTacToe?limit=${itemsPerPage} `);
        const sortedUserData = response.data.sort(
          (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
        );

        setGroupData(sortedUserData);
        console.log(sortedUserData, 'i want to see groups data');
      } catch (error) {
        console.error('Error fetching data:', error);
        setGroupData([]); // Set an empty array if no data is found
      }
    };
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000); // Fetch every 2 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [itemsPerPage]);

  const handleView = (groupId) => {
    navigate(`/ticTacToe/groupsData/players?groupId=${groupId}`);
  };

  if (groupData === null || groupData.length === 0) {
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

  const noDataFoundMessage = groupData && groupData.length === 0 ? 'No data found' : null;
 return (
    <div>
      {noDataFoundMessage && <div>{noDataFoundMessage}</div>}
      {groupData && groupData.length > 0 ? (
        <>
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
          <option value={8}>5</option>
          <option value={50}>7</option>
          <option value={100}>10</option>
          <option value={100}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
          <table className="table">
            <thead>
              <tr>
                <th className="table-header">Sr. No.</th>
                <th className="table-header">TableID</th>
                <th className="table-header">GroupId</th>
                <th className="table-header">isGameOver</th>
                <th className="table-header">players</th>
                <th className="table-header">Date&Time</th>
                <th className="table-header">View</th>
              </tr>
            </thead>
            <tbody>
              {groupData.map((item, index) => (
                <tr key={item._id}>
                  <td className="table-cell">{startSerialNumber + index}</td>
                  <td className="table-cell">{item.tableId}</td>
                  <td className="table-cell">{item._id}</td>
                  <td className="table-cell">{item.isGameOver.toString()}</td>
                  <td className="table-cell">{item.group.length}</td>
                  <td className="table-cell">{formatDateToIndianLocale(item.gameEndTime)}</td>
                  <td className="table-cell">
                    <button
                      className="button userHistory-button"
                      onClick={() => handleView(item._id)}
                    >
                      <i className="fas fa-eye"></i> view
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
              disabled={indexOfLastItem >= groupData.length ||
                currentItems.length < itemsPerPage}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        null
      )}
        <Footer />
    </div>
  );
};
export default TicTacToeGroups;
