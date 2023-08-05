// type rafce for navbar format

import "./NavbarStyle.css"

import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"   // category name is Fa and icons name is Bars


const Navbar = () => {
   const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)
  const [color, setColor] = useState(false);
  const changeColor = () => {
   if(window.scrollY >=100){
      setColor(true);
   } else{
      setColor(false);
} 
  }

  window.addEventListener("scroll", changeColor);

return (
    <div className= { color ? "header header-bg" :
    "header"}>                   {/* use header here this is the parent class */}
        <Link to="/">                           {/* link is use to when we click on name of page then it will redirected to that page ex-portfolio name */}
        <h1>ADMIN PANEL</h1>
        </Link>
                  {/* if click   then goto this    if not click then goto nav-menu */}
        <ul className= {click ? "nav-menu active" : "nav-menu"}>          {/* use this class name for style in navbar.css file */}
         <li>
            <Link to ="/">Home</Link>             {/* link is used to create url for path */}
         </li>
         <li>
            <Link to ="/dashboard">Users</Link>
         </li>
         <li>
            <Link to ="/botPlayers">Bot</Link>
         </li>
         <li>
            <Link to ="/createTournament"> CreateTournament</Link>
         </li>
         {/* <li>
            <Link to ="/contact">Contact</Link>
         </li> */}
        </ul>

        <div className="hamburger" onClick={handleClick}>       {/* hamburger is the icon */}
         {click ?(
            <FaTimes size={20} style={{ color: "#fff"}} />
         ) : (
            <FaBars size={20} style={{color: "#fff"}}/>
         )}
           </div>
</div>
  )
}

export default Navbar


