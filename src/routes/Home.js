// type rafce for format of react function it will get filename also

import React from 'react'
import Navbar from '../components/Navbar'    // import navbar here to use component here now navbar is randering in home page and homepage is randering in app.js page
import HeroImage from '../components/HeroImage'    // import HeroImage here to use component here now Heroimage is randering in home page and homepage is randering in app.js page
// import Footer from '../components/Footer'
import Work from "../components/Work"


const Home = () => {
  return (
    <div>
        <Navbar/>             {/* call imported navbar file here */}
        <HeroImage/>                {/* call imported Heroimage file here */}
       <Work/>
        {/* <Footer/> */}
        </div>
  )
}

export default Home