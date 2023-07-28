import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CricketStyle.css';

const SnakeLadderData = () => {
  const [snakeLadderData, setSnakeLadderData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

 
  useEffect(() => {
  const fetchSnakeLadderData = () => {
    axios
       .get('https://snakeladder1.azurewebsites.net/getAllSnakeLadderData')
      .then(response => {
        const sortedData = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setSnakeLadderData(sortedData);
      
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        console.log('Error response:', error.response);
        console.log('Error message:', error.message);
      });
  };
  fetchSnakeLadderData();
  const interval = setInterval(fetchSnakeLadderData, 3000); // Fetch every 2 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  if (snakeLadderData === null) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Calculate current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = snakeLadderData.slice(indexOfFirstItem, indexOfLastItem);
  const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;

  return (
    <div>
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
          disabled={indexOfLastItem >= snakeLadderData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SnakeLadderData;
