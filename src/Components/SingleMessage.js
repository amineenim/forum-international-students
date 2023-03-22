

import React from 'react'
import '../Styles/SingleMessage.css'

function SingleMessage(props) {
  return (
    <div className='single-message'>
        <img src={require(`../assets/profiles/${props.avatar}`)} alt="profile-avatar" />
        <div className='text-message'>
            <div className='message'> {props.content} </div>
            <small> {props.time} </small>
        </div>
    </div>
  )
}

export default SingleMessage