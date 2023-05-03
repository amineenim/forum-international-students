

import React from 'react'
import SingleFriend from './SingleFriend'

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
            ) : "Pas d'amis en ligne !"
           
        } 
    </div>
  )
}

export default OnlineFriends