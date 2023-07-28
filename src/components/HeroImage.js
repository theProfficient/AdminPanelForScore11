import "./HeroImageStyle.css";

import React from 'react'

import IntroImage from "../assets/blue1.jpg"
import { Link } from "react-router-dom";

const HeroImage = () => {
  return (
    <div className="hero">
{/* <div className="mask">
    <img className="into-img"
    src= {IntroImage} alt="IntroImage"/>
</div> */}
{/* <div className="content">
    <p>  Welcome to the gaming website.</p>
    <h1> Gaming App.</h1>
    <div>
        <Link to="/games" className="btn">Games</Link>
        <Link to="/contact" className="btn btn-light">Contact</Link>
    </div>
</div> */}

    </div>
  )
}

export default HeroImage