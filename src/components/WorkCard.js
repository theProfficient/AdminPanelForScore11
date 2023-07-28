import "./WorkCardStyle.css";
import React from 'react';
import { NavLink,useNavigate } from "react-router-dom";
import Cricket from "./games/Cricket"

const WorkCard = (props) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    if (props.Groups === '/games/cricket/Groups') {
      navigate('/games/cricket/Groups');
    } else if (props.Groups === '/games/snakeLadder/Groups') {
      navigate('/games/snakeLadder/Groups');
    } else {
      navigate('/some/other/route');
    }
  };

  return (
    <div className="games-card" onClick={handleCardClick}>
      <img src={props.pc} alt="pc" />
      <h2 className="games-title">{props.title}</h2>
      <div className="pro-details">
        <p>{props.text}</p>
        {/* <div className="pro-btns"> */}
          {/* <button className="btn" onClick={handleClick}>
            View
          </button> */}
          {/* <button className="btn" onClick={handleClickOnGroups}> */}
            {/* Groups */}
          {/* </button> */}
        </div>
      {/* </div> */}
    </div>
  );
};

export default WorkCard;
