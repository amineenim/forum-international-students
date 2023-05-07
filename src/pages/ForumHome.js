import React from 'react'
import Header from '../Components/Header'
import ForumHomeBody from '../Components/ForumHomeBody'
import Footer from '../Components/Footer'

function ForumHome() {
  return (
    <div>
      <div className='mb-[9%]'>
        <Header/>
      </div>
      <ForumHomeBody/>
      <Footer/>
    </div>
  )
}

export default ForumHome