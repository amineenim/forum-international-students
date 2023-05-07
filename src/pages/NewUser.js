

import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import CreateUser from '../Components/CreateUser'
import '../Styles/NewUser.css'

function NewUser() {
  return (
    <div className='new-user-page'>
        <Header />
        <CreateUser />
        <Footer />
    </div>
  )
}

export default NewUser