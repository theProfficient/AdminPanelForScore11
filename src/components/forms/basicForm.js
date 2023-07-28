import React, { useState } from 'react';
import './basicFormStyle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar1 from './Navbar1'

export const BasicForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allEntry, setAllEntry] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post('https://snakeladder-c5dz.onrender.com/login', { email, password });
      const response = await axios.post('https://snakeladder1.azurewebsites.net/login', { email, password });
      const { data } = response;
      console.log("email>>>>>>>>>", email, "password>>>>>>>>>", password);
      if (data.success) {
        const newEntry = { email, password };
        setAllEntry([...allEntry, newEntry]);
        console.log(allEntry);
        setEmail('');
        setPassword('');
        setError('');
        onLogin(); // Update isLoggedIn state in the parent component
        navigate('/home'); // Redirect to the home page
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred');
    }
  };

  return (
    <>
       <Navbar1 />
      <div className='parentContainer'>
        <div className="formContainer">
          {/* <h1 className="createTournamentsTitle">Login Here</h1>  */}
          <form action="" onSubmit={submitForm}>
            <div className="inputContainer">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="loginButton">
              Login
            </button>
          </form>
          {error && <p>{error}</p>}
          <div>
            {allEntry.map((curEleem) => {
              return (
                <div className="showDataStyles" key={curEleem.email}>
                  <p>{curEleem.email}</p>
                  <p>{curEleem.password}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicForm;
