

import React from 'react'
import SingleFriend from './SingleFriend'

function OutFriends(props) {
  const outFriends = props.friends.filter(friend => friend.online === 0)
  /*require(`../assets/profiles/${friend.avatar}`) */
  return (
    <div className='hors-ligne-friends'>
      <h3>HORS-LIGNE</h3>
        {
           outFriends.length > 0 ? outFriends.map(
            (friend) => {
                return (
                    <SingleFriend 
                    key = {friend.id}
                    id={friend.id}
                    name = {friend.name}
                    status = {friend.online}
                    image = {friend.imageUrl}
                    setUser = {props.setUser}
                    />
                )
            }
        ) : "pas d'amis !"
        }
    </div>
  )
}

export default OutFriends