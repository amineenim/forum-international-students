import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RegistrationBody from '../Components/RegistrationBody';
import '../Styles/RegistrationBody.css';


function Registration() {
  return (
    <div className='registration-page'>
        <div className='mb-[9%]'>
          <Header/>
        </div>
        <RegistrationBody/>
        <Footer/>
    </div>
  )
}

export default Registration