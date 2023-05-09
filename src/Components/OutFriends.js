

import React from 'react'
import SingleFriend from './SingleFriend'
import '../Styles/OutlineFriends.css'
import { FaUserFriends } from 'react-icons/fa'

function OutFriends(props) {
  const outFriends = props.friends.filter(friend => friend.online === 0)

  return (
    <div className='hors-ligne-friends'>
      <h3>HORS-LIGNE</h3>
        {
           outFriends.length > 0 ? outFriends.map(
            (friend) => {
                return (
                    <SingleFriend 
                    key = {friend.id_user}
                    id={friend.id_user}
                    name = {friend.name}
                    status = {friend.online}
                    image = {friend.imageUrl}
                    setUser = {props.setUser}
                    />
                )
            }
        ) : 
        (
          <div className='empty-list-of-out-friends'>
              <p>Aucun ami en ligne</p>
              <FaUserFriends size={26} />
          </div>
        )
        }
    </div>
  )
}

export default OutFriends