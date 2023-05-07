
import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProfileBody from '../Components/ProfileBody';

function UserProfile() {
  return (
    <div className='profile-page'>
        <div className='mb-[9%]'>
          <Header/>
        </div>
        <ProfileBody/>
        <Footer/>
    </div>
  )
}

export default UserProfile