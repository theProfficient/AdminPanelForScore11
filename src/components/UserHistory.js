import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './games/CricketStyle.css';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer.js'

const UserHistory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const UserId = queryParams.get('UserId');

  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    axios
    .get(`https://snakeladder1.azurewebsites.net/profile?UserId=${UserId}`)
      .then(response => {
        setUserData(response.data.data);
        console.log(response.data.data.history,"i want to see history");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [UserId]);

  if (userData === null) {
    return <div>Loading...</div>;
  }

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.history.slice(indexOfFirstItem, indexOfLastItem);
  const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;


  return (
    <div>
      {/* <h2>User History</h2> */}
      <table className="table">
        <thead>
          <tr>
          <th className="table-header">Sr. No.</th>
            <th className="table-header">TableID</th>
            <th className="table-header">GameName</th>
            <th className="table-header">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item._id}>
              <td className="table-cell">{startSerialNumber + index}</td>
              <td className="table-cell">{item.tableId}</td>
              <td className="table-cell">{item.gameType}</td>
              <td className="table-cell">{item.time}</td>
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
          disabled={indexOfLastItem >= userData.length}
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default UserHistory;
