import React from 'react'
import Navbar from '../components/Navbar' 
import Footer from '../components/Footer'
import HeroImage2 from '../components/HeroImage2'
import BasicForm from "../components/forms/basicForm";
const Contact = () => {
  return (
    <div>
      <Navbar/>
      <HeroImage2 heading="LOGIN." text="Please provide your email Id and Password."/>
      <BasicForm/>
      <Footer/>
    </div>
  )
}

export default Contact