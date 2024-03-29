
import React from 'react'
import Header from '../Components/Header'
import HomeBody from '../Components/HomeBody'
import Footer from '../Components/Footer'

function Home() {
  return (
    <div className='home-page'>
        <div className='mb-[9%]'>
          <Header/>
        </div>
        <HomeBody/>
        <Footer/>
    </div>
  )
}

export default Home