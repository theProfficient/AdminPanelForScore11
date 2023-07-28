// ParentComponent.js
import React, { useState } from 'react';
import BasicForm from './BasicForm';

const ParentComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <p>Welcome! You are logged in.</p>
      ) : (
        <BasicForm onLogin={handleLogin} />
      )}
    </>
  );
};

export default ParentComponent;