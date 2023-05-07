

import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import TemoignageBody from '../Components/TemoignageBody';

function Temoignage() {
  return (
    <div className='temoignage-page'>
        <div className='mb-[9%]'>
          <Header/>
        </div>
        <TemoignageBody/>
        <Footer/>
    </div>
  )
}

export default Temoignage