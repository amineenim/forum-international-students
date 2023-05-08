

import React from 'react'
import SingleFriend from './SingleFriend'
import '../Styles/OnlineFriends.css'
import { FaUserFriends } from 'react-icons/fa'

function OnlineFriends(props) {
    const onlinefriends = props.friends.filter(
        friend => friend.online === 1
    )
  return (
    <div className='list-of-friends'>
        <h3>EN LIGNE</h3>
        {
            onlinefriends.length > 0 ? onlinefriends.map(
                (friend) => {
                    return (
                        <SingleFriend 
                        key = {friend.id}
                        id = {friend.id}
                        name = {friend.name}
                        status = {friend.online}
                        image = {friend.imageUrl}
                        setUser = {props.setUser}
                        />
                    )
                }
            ) : (
                <div className='empty-list-of-friends'>
                    <p>Aucun ami en ligne</p>
                    <FaUserFriends size={26} />
                </div>
            )
        } 
    </div>
  )
}

export default OnlineFriends