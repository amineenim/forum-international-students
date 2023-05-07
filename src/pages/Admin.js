import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import AdminBody from '../Components/AdminBody'
import '../Styles/Admin.css'

function Admin() {
  return (
    <div className='admin-page'>
        <div className='mb-[9%]'>
          <Header/>
        </div>
        <AdminBody />
        <Footer />
    </div>
  )
}

export default Admin