import React from "react";
import { Link } from "react-router-dom";
import "./FooterStyle.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Link to="/games/cricket/Groups" className="game-button">
        Cricket
      </Link>
      <Link to="/games/snakeLadder/Groups" className="game-button">
        SnakeLadder
      </Link>
      <Link to="/games/TicTacToe/Groups" className="game-button">
        TicTacToe
      </Link>
      <Link to="/games/AirHocky/Groups" className="game-button">
        AirHocky
      </Link>
      <Link to="/home" className="game-button">
        Home
      </Link>
    </footer>
  );
};

export default Footer;
