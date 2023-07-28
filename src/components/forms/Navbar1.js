import React from 'react';
import logo from '../../assets/logo.jpg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
          <img src={logo} alt="Logo" style={{ marginLeft: '3px', width: '50px', height: '50px' }} />
        <h3 className="navbar-heading" style={{ fontFamily: 'Arial, sans-serif' }}>
          Score11
        </h3>
      </div>
      <div className="navbar-right">
        {/* Add any other navbar elements or links here */}
      </div>
    </nav>
  );
};

export default Navbar;
