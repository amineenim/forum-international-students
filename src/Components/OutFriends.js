

import React from 'react'
import SingleFriend from './SingleFriend'

function OutFriends(props) {
  const outFriends = props.friends.filter(friend => friend.status === 0)
  
  return (
    <div className='hors-ligne-friends'>
      <h3>HORS-LIGNE</h3>
        {
           outFriends.map(
            (friend) => {
                return (
                    <SingleFriend 
                    key = {friend.id}
                    id={friend.id}
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

export default OutFriends