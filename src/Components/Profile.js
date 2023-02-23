

import React from 'react';
import {FaCamera} from 'react-icons/fa'

function Profile(props) {
  return (
    <div className='student-profile'>
        <div className='img-container'>
            <img src={props.image} alt="profile-image"/>
            <div className='camera-container'>
                <FaCamera className='camera' size={30}
                />
            </div>
        </div>
        <div className='student-data'>
            <div className='name'>
                <strong>Nom : </strong>
                <p>{props.name}</p>
            </div>
            <div className='email'>
                <strong>Adresse Email : </strong> 
                <p>{props.email}</p>
            </div>
            <div className='filiere'>
                <strong>Filière :</strong>
                <p>{props.filiere}</p>
            </div>
            <div className='promo'>
                <strong>Promotion :</strong>
                <p>{props.promotion}</p>
            </div>
        </div>
    </div>
  )
}

export default Profile