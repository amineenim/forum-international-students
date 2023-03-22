

import React from 'react'
import avatar from '../assets/profiles/avatar.jpg'
import SingleFriend from './SingleFriend'

function OnlineFriends(props) {
    const onlinefriends = props.friends.filter(
        friend => friend.status === 1
    )
  return (
    <div className='list-of-friends'>
        <h3>EN LIGNE</h3>
        {
            onlinefriends.map(
                (friend) => {
                    return (
                        <SingleFriend 
                        key = {friend.id}
                        id = {friend.id}
                        name = {friend.name}
                        status = {friend.status}
                        image = {require(`../assets/profiles/${friend.avatar}`)}
                        setUser = {props.setUser}
                        />
                    )
                }
            )
           
        } 
    </div>
  )
}

export default OnlineFriends