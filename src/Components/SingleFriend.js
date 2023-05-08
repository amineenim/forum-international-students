

import React from 'react'
import '../Styles/SingleFriend.css'
import { ApiService } from '../Services/ApiService'

//function that handles sending the request to the API so that messages are read after the discussion is open
const handleRead = async(id) => {
  console.log(id)
  try {
    const response = await ApiService.put('/messages/read',{
      idEmeteur : JSON.parse(localStorage.getItem('current_user')).id ,
      idRecepteur : id
    })
    if(response.status === 200 && response.statusText === "OK")
    {
      console.log('everything is good !')
    }
  } catch (error) {
    console.log(error.response)
  }
}

function SingleFriend(props) {
  return (
    <div className='single-friend'
    onClick={() => {
      props.setUser(props.id)
      handleRead(props.id)
    }}
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