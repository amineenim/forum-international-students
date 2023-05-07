import React from 'react'
import Header from '../Components/Header'
import ContactBody from '../Components/ContactBody'
import Footer from '../Components/Footer'

function Contact() {
  return (
    <div>
        <div className='mb-[9%]'>
          <Header/>
        </div>
        <ContactBody/>
        <Footer/>
    </div>
  )
}

export default Contact