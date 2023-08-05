import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CricketStyle.css';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/Footer'

const CrichetMatchData = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const groupId = queryParams.get('groupId');

  const [playersData, setPlayersData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
    try {
      const response = await axios.get(`https://snakeladder1.azurewebsites.net/getCricGrp?groupId=${groupId}`)
      // .get(`https://snakeladder-c5dz.onrender.com/profile?UserId=${UserId}`)
      
        setPlayersData(response.data);
        console.log(response.data.updatedPlayers,"i want to see history");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000); // Fetch every 2 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [groupId]);

  if (playersData === null) {
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
  const currentItems = playersData.updatedPlayers.slice(indexOfFirstItem, indexOfLastItem);
  const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;


  return (
    <div>
      {/* {/ <h2>User History</h2> /} */}
      <table className="table">
        <thead>
        <tr>
          <th className="table-header">Sr. No.</th>
            <th className="table-header">UserId</th>
            <th className="table-header">userName</th>
            <th className="table-header">run</th>
            <th className="table-header">wicket</th>
            <th className="table-header">prize</th>
            <th className="table-header">PlayerType</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item._id}>
            <td className="table-cell">{startSerialNumber + index}</td>
              <td className="table-cell">{item.UserId}</td>
              <td className="table-cell">{item.userName}</td>
              <td className="table-cell">{item.run}</td>
              <td className="table-cell">{item.wicket}</td>
              <td className="table-cell">{item.prize}</td>
              <td className="table-cell">{item.isBot ? "Bot" : "Player"}</td>
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
          disabled={indexOfLastItem >= playersData.length}
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CrichetMatchData;
