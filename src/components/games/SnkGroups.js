import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CricketStyle.css';
import { useNavigate } from 'react-router-dom';

const SnakeLadderGroups = () => {
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

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
        const response = await axios.get('https://snakeladder1.azurewebsites.net/getAllGroupsOfSnk');
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
  }, []);

  const handleView = (groupId) => {
    navigate(`/snakeLadder/groupsData/players?groupId=${groupId}`);
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
                  <td className="table-cell">{index + 1}</td>
                  <td className="table-cell">{item.tableId}</td>
                  <td className="table-cell">{item._id}</td>
                  <td className="table-cell">{item.isGameOver.toString()}</td>
                  <td className="table-cell">{item.group.length}</td>
                  <td className="table-cell">{formatDateToIndianLocale(item.createdTime)}</td>
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
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(groupData.length / itemsPerPage)))}
              disabled={indexOfLastItem >= groupData.length}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        null
      )}
    </div>
  );
};
export default SnakeLadderGroups;
