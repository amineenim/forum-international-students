

import React, { useEffect, useState } from 'react'
import SingleFriend from './SingleFriend'
import SingleMessage from './SingleMessage'
import '../Styles/Discussion.css'
import { ApiService } from '../Services/ApiService'
import AuthService from '../Services/AuthService'
import { useNavigate } from 'react-router-dom'


function Discussion(props) {
    const navigate = useNavigate()
    // function that verifies if the user is authenticated 
    useEffect(() => {
        if(!AuthService.isAuthenticated())
        {
            navigate('/login')
        }
    }, [])
    const selectedFriend = props.friends.filter((friend) => friend.id === props.user)[0]
    const current_user = JSON.parse(localStorage.getItem('current_user'))
    // state that stores the conversation messages 
    const [conversationMessages, setConversationMessages] = useState([])
    // function that get called each time the selected user is changed
    useEffect(() => {
        const makeApiCall = async() => {
            try {
                const response = await ApiService.get(`/messages/?idEmeteur=${current_user.id}&idRecepteur=${selectedFriend.id}`)
                if(response.status === 200 && response.statusText === "OK")
                {
                    setConversationMessages(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        selectedFriend && makeApiCall()
    },[props.user])
  return (
    <div className='conversation'>
        {
            props.user != null ? (
                <>
                    <div className='top-conversation'>
                    <SingleFriend image={selectedFriend.imageUrl}
                    name = {selectedFriend.name}
                    status = {selectedFriend.online}
                    />
                    </div>
                    <div className='body-conversation'>
                        {
                            conversationMessages.map(
                                (message, index) => {
                                    return <SingleMessage 
                                            key={index}
                                            content={message.content}
                                            time = {message.time}
                                            avatar = {message.OWNER === selectedFriend.id ? selectedFriend.imageUrl : current_user.imageUrl}
                                            />
                                }
                            )
                        }
                    </div>
                    <div className='bottom-conversation'>
                        <input type='text' name='textMessage' placeholder="type your message" />
                    </div>
                </>
            )
            : 'pas de conversation selectionée'
        }
    </div>
  )
}

export default Discussion