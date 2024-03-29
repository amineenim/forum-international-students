

import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import MessagerieBody from '../Components/MessagerieBody'

function Messagerie() {
  return (
    <div className='messagerie-page'>
        <div className='mb-[9%]'>
          <Header/>
        </div>
        <MessagerieBody />
        <Footer />
    </div>
  )
}

export default Messagerie