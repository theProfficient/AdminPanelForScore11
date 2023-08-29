import "./WorkCardStyle.css";
import React from "react";
import { useNavigate } from "react-router-dom";


const WorkCard = (props) => {
  console.log(props,"__________props");
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.view === "/games/cricket") {
      navigate("/games/cricket");
    } else if (props.view === "/games/snakeLadder") {
      navigate("/games/snakeLadder");
    } else if (props.view === "/games/ticTacToe") {
      navigate("/games/ticTacToe");
    }else {
      navigate("/some/other/route");
    }
  };

  const handleCardClick = () => {
    if (props.source === "/games/cricket/Groups") {
      navigate("/games/cricket/Groups");
    } else if (props.source === "/games/snakeLadder/Groups") {
      navigate("/games/snakeLadder/Groups");
    }else if (props.source === "/games/ticTacToe/Groups") {
      navigate("/games/ticTacToe/Groups");
    } else {
      navigate("/some/other/route");
    }
  };

  return (
    <div className="games-card">
      <img src={props.pc} alt="pc" />
      <div className="pro-details">
        <div className="pro-btns">
          <button className="btn" onClick={handleClick}>
            Tables
          </button>
            <button className="btn" onClick={handleCardClick}>
            Groups
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
