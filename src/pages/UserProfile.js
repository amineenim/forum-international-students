
import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProfileBody from '../Components/ProfileBody';

function UserProfile() {
  return (
    <div className='profile-page'>
        <Header/>
        <ProfileBody/>
        <Footer/>
    </div>
  )
}

export default UserProfile