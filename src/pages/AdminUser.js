

import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ViewUser from '../Components/ViewUser'
import '../Styles/AdminUser.css'

function AdminUser() {
  return (
    <div className='view-user-admin-page'>
        <div className='mb-[9%]'>
          <Header/>
        </div>
        <ViewUser />
        <Footer />
    </div>
  )
}

export default AdminUser