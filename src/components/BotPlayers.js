import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './games/CricketStyle.css';
import Footer from '../components/Footer.js';

const BotData = () => {
  const [botData, setBotData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://snakeladder1.azurewebsites.net/getBotPlayers');
        setBotData(response.data);
        console.log(response.data,"========bot players data")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  if (botData === null) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = botData.slice(indexOfFirstItem, indexOfLastItem);
  const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Sr. No.</th>
            <th className="table-header">UserId</th>
            <th className="table-header">userName</th>
            <th className="table-header">credits</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((bots, index) => (
            <tr key={bots._id}>
              <td className="table-cell">{startSerialNumber + index}</td>
              <td className="table-cell">{bots.UserId}</td>
              <td className="table-cell">{bots.userName}</td>
              <td className="table-cell">{bots.credits}</td>
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
          disabled={indexOfLastItem >= botData.length}
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default BotData;
