import React from 'react'
import Header from '../Components/Header'
import AboutBody from '../Components/AboutBody'
import Footer from '../Components/Footer'

function About() {
  return (
    <div>
        <div className='mb-[9%]'>
        <Header/>
      </div>
        <AboutBody/>
        <Footer/>
    </div>
  )
}

export default About