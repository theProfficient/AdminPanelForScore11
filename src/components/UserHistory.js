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
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    axios
     .get(`https://snakeladder1.azurewebsites.net/profile?UserId=${UserId}&limit=${itemsPerPage}`)
    // .get(`http://localhost:5000/profile?UserId=${UserId}&limit=${itemsPerPage}`)
      .then(response => {
        setUserData(response.data.data);
        console.log(response.data.data.history,"i want to see history");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [UserId,itemsPerPage]);

  // Display a "No data found" message if there is no data available
  if (!userData) {
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
  const currentItems = userData.history.slice(indexOfFirstItem, indexOfLastItem);
  const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;


  return (
    <div>
      {/* <h2>User History</h2> */}
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
          <option value={10}>10</option>
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
            <th className="table-header">GameName</th>
            <th className="table-header">Date & Time</th>
            {/* <th className="table-header">cricMatch</th>
            <th className="table-header">cricWin</th> */}
            {/* <th className="table-header">snkMatch</th>
            <th className="table-header">snkWin</th> */}
            {/* <th className="table-header">TicTacToeMatch</th>
            <th className="table-header">TicTacToeWin</th>
            <th className="table-header">airHocMatch</th>
            <th className="table-header">airHocWin</th> */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item._id}>
              <td className="table-cell">{startSerialNumber + index}</td>
              <td className="table-cell">{item.tableId}</td>
              <td className="table-cell">{item.gameType}</td>
              <td className="table-cell">{item.time}</td>
              {/* <td className="table-cell">{userData.cricketData[0].playCount}</td>
              <td className="table-cell">{userData.cricketData[0].winCount}</td>
              <td className="table-cell">{userData.snkLadderData[0].playCount}</td>
              <td className="table-cell">{userData.snkLadderData[0].winCount}</td>
              <td className="table-cell">{userData.ticTacToeDataData[0].playCount}</td>
              <td className="table-cell">{userData.ticTacToeDataData[0].playCount}</td>
              <td className="table-cell">{userData.hockeyDataData[0].playCount}</td>
              <td className="table-cell">{userData.hockeyDataData[0].playCount}</td> */}
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
