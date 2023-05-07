import React from 'react'
import Header from '../Components/Header'
import PasswordBody from '../Components/PasswordBody'
import Footer from '../Components/Footer'

function Password() {
  return (
    <div>
        <div className='mb-[9%]'>
          <Header/>
        </div>
        <PasswordBody/>
        <Footer/>
    </div>
  )
}

export default Password