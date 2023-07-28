import React from 'react';
import Navbar from '../components/Navbar';
import HeroImage2 from '../components/HeroImage2';
// import Footer from '../components/Footer';
import CreateTournaments from "../components/CreateTable";

const CreateTournament = () => {

  return (
    <div>
      {/* <Navbar/>
      <HeroImage2 heading="TOURNAMENT " text="Introduce a new Tournament."/> */}
      <CreateTournaments/>
      {/* <Footer/> */}
    </div>
  );
}

export default CreateTournament;
