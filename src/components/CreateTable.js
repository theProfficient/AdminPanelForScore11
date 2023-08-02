import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateTableStyle.css';
import Footer from '../components/Footer.js'


const CreateTournaments = () => {
  const [entryFee, setEntryFee] = useState('');
  const [prizeAmount, setPrizeAmount] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [gameName, setGameName] = useState('');                 
  const navigate = useNavigate();

  // Helper function to check if the input is valid
  const isValidInput = (value) => {
    const numValue = Number(value);
    return numValue > 0 && numValue < 1000000;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the input values are valid
      if (!isValidInput(entryFee) || !isValidInput(prizeAmount) || !isValidInput(maxTime) || !isValidInput(maxPlayers)) {
        alert('Invalid input. Please make sure entry fee, prize amount, end time, and max players are greater than 0 and less than 1,000,000.');
        return;
      }

      // Create tournament object
      const tournament = {
        entryFee,
        prizeAmount,
        maxTime,
        maxPlayers
      };
      let response;
      // Send POST request to the API endpoint
      if (gameName.toLowerCase() === 'cricket') {
        response = await axios.post('https://snakeladder1.azurewebsites.net/tournamentsByAdmin', tournament);
        console.log('Tournament for cricket created successfully:', response.data.data);
      } else if (gameName.toLowerCase() === 'snakeladder') {
        response = await axios.post('https://snakeladder1.azurewebsites.net/snktournamentsByAdmin', tournament);
        console.log('Tournament for snakeLadder created successfully:', response.data.data);
      } else {
        throw new Error('Invalid game name');
      }

      // Clear input fields
      setEntryFee('');
      setPrizeAmount('');
      setMaxTime('');
      setMaxPlayers('');
      setGameName('');

      // Show success message
      alert('New Tournament created successfully');

      // Navigate to a different page after successful creation
      navigate('/createTournament');
    } catch (error) {
      console.error('Error creating tournament:', error.response);
    }
  };

  return (
    <div className="container">
      {/* <h1>Create Tournament</h1> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label className="label">Game Name:</label>
          <select
            className="input" // Use select element for the dropdown
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
          >
            <option value="">Select Game</option> {/* Add a default empty option */}
            <option value="cricket">Cricket</option>
            <option value="snakeladder">SnakeLadder</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label">Entry Fee:</label>
          <input
            type="text"
            className="input"
            value={entryFee}
            onChange={(e) => setEntryFee(Math.max(0, parseInt(e.target.value)))}
            min="0" // Add min attribute to restrict negative numbers
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Prize Amount:</label>
          <input
            type="number"
            className="input"
            value={prizeAmount}
            onChange={(e) => setPrizeAmount(Math.max(0, parseInt(e.target.value)))}
            min="0" // Add min attribute to restrict negative numbers
            required
          />
        </div>
        <div className="form-group">
          <label className="label">End Time:</label>
          <input
            type="number"
            className="input"
            value={maxTime}
            onChange={(e) => setMaxTime(Math.max(0, parseInt(e.target.value)))}
            min="0" // Add min attribute to restrict negative numbers
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Max Players:</label>
          <input
            type="number"
            className="input"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(Math.max(0, parseInt(e.target.value)))}
            min="0" // Add min attribute to restrict negative numbers
            required
          />
        </div>
        <button type="submit" className="button">
          Create Tournament
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default CreateTournaments;
