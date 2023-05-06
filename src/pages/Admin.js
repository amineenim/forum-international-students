import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import AdminBody from '../Components/AdminBody'
import '../Styles/Admin.css'

function Admin() {
  return (
    <div className='admin-page'>
        <Header />
        <AdminBody />
        <Footer />
    </div>
  )
}

export default Admin