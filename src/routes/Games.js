import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroImage2 from '../components/HeroImage2';
import Work from '../components/Work';

const Games = ()=>{
  return <div>
    <Navbar />
    <HeroImage2 heading="GAMES." text="Some of our most recent Games" />
    <Work />
    <Footer />
  </div>
}

export default Games;
