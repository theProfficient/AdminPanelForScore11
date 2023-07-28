import React from "react";
import { Link } from "react-router-dom";
import "./FooterStyle.css"

const Footer = () => {
  return (
    <footer className="footer">
      <Link to="/games/cricket/Groups" className="game-button">
        Cricket
      </Link>
      <Link to="/games/snakeLadder/Groups" className="game-button">
        SnakeLadder
      </Link>
      <Link to="/games/cricket/TicTacToe" className="game-button">
      TicTacToe
      </Link>
      <Link to="/games/snakeLadder/AirHocky" className="game-button">
      AirHocky
      </Link>
    </footer>
  );
};

export default Footer;
