

import React from 'react'
import '../Styles/SingleFriend.css'

function SingleFriend(props) {
  return (
    <div className='single-friend'
    onClick={() => props.setUser(props.id)}
    >
        <div className='profile-avatar'>
            <img src={props.image}  alt="profile" />
            <div className={props.status ? 'en-ligne' : 'hors-ligne'}>
            </div>
        </div>
        <p> {props.name} </p>
    </div>
  )
}

export default SingleFriend