import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CricketStyle.css';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/Footer'

const TicTacToeMatchData = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const groupId = queryParams.get('groupId');

  const [playersData, setPlayersData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getGroupsOfTicTacToeAsPerGrpId?groupId=${groupId}`)
     
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
      {/* <h2>User History</h2> */}
      <table className="table">
        <thead>
          <tr>
          <th className="table-header">Sr. No.</th>
            <th className="table-header">GroupId</th>
            <th className="table-header">PlayerName</th>
            <th className="table-header">points</th>
            <th className="table-header">Prize</th>
            <th className="table-header">IsBot</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item._id}>
              <td className="table-cell">{startSerialNumber + index}</td>
              <td className="table-cell">{groupId}</td>
              <td className="table-cell">{item.userName}</td>
              <td className="table-cell">{item.points}</td>
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

export default TicTacToeMatchData;
