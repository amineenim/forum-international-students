

import React from 'react'
import '../Styles/UpdateUser.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import UpdateUserBody from '../Components/UpdateUserBody'

function UpdateUser() {
  return (
    <div>
        <div className='mb-[9%]'>
          <Header/>
        </div>
        <UpdateUserBody />
        <Footer />
    </div>
  )
}

export default UpdateUser