

import React from 'react';
import '../Styles/ProfileBody.css';
import Profile from './Profile';
import profileImge from '../assets/profiles/student1.jpg'
import {BsFillFilePersonFill} from 'react-icons/bs';
import {RiLockPasswordFill} from 'react-icons/ri';
import {FiLogOut} from 'react-icons/fi'

function ProfileBody() {
  return (
    <div className='profile-container'>
        <div className='left-section'>
            <Profile
            image={profileImge}
            name = "test test"
            email = "test@gmail.com"
            filiere = "M1 DFS"
            promotion = "2022-2023"
            />
        </div>
        <div className='right-section'>
            <h3>Actions To take : </h3>
            <div className='modify-profile'>
                <BsFillFilePersonFill size={30} />
                <button className='btn'>Modifier Profile</button>
            </div>
            <div className='change-password'>
                <RiLockPasswordFill size={30} />
                <button className='btn'>Changer Mot de passe</button>
            </div>
            <div className='deconnecter'>
                <FiLogOut size={30} />
                <button className='btn'>se déconnecter</button>
            </div>
        </div>
    </div>
  )
}

export default ProfileBody