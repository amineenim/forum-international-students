

import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import LoginBody from '../Components/LoginBody';

function Login() {
  return (
    <div className='login-page'>
        <div className='mb-[9%]'>
          <Header/>
        </div>
        <LoginBody/>
        <Footer/>
    </div>
  )
}

export default Login