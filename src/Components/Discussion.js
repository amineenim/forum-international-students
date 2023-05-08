

import React, { useEffect, useState } from 'react'
import SingleFriend from './SingleFriend'
import SingleMessage from './SingleMessage'
import '../Styles/Discussion.css'
import { ApiService } from '../Services/ApiService'
import AuthService from '../Services/AuthService'
import { useNavigate } from 'react-router-dom'
import { RiMessage2Line } from 'react-icons/ri'
import { AiOutlineSend } from 'react-icons/ai'
import { useForm } from 'react-hook-form'


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
    // state that stores whether conversation messages have changed 
    const [isMessagesChanged, setIsMessagesChanged] = useState(false)
    // function that get called each time the selected user is changed
    useEffect(() => {
        const makeApiCall = async() => {
            try {
                const response = await ApiService.get(`/messages/?idEmeteur=${current_user.id}&idRecepteur=${selectedFriend.id}`)
                if(response.status === 200 && response.statusText === "OK")
                {
                    setConversationMessages(response.data.data)
                    isMessagesChanged && setIsMessagesChanged(false)
                }
            } catch (error) {
                console.log(error.response)
            }
        }
        selectedFriend && makeApiCall()
    },[props.user, isMessagesChanged])

    // make the scroll bar go to bottom
    useEffect(() => {
        if(conversationMessages.length > 0){
            const bodyConversation = document.querySelector('.body-conversation');
            bodyConversation.scrollTop = bodyConversation.scrollHeight;
        }
    },[props.user, isMessagesChanged])

    const {register, handleSubmit, setValue} = useForm()
    // function that handles sending a new message 
    const handleSendMessage = async(data) => {
        // verify that the data is not empty 
        try {
            const response = await ApiService.post('/messages/',{
                idEmeteur : current_user.id,
                idRecepteur : props.user,
                content : data.textMessage
            })
            if(response.status === 200 && response.statusText === "OK")
            {
                // a new discussion has been initiated so , the friends list with discussion and no discussion 
                //must be updated 
                props.setIsNewDiscussionStarted(true)
                setValue('textMessage','')
                setIsMessagesChanged(true)
            }
        } catch (error) {
            console.log(error.response)
        }
    }
  return (
    <div className={props.user ? 'conversation' : 'no-conversation'}>
        {
            props.user != null ? (
                <>
                    <div className='top-conversation'>
                    <SingleFriend image={selectedFriend.imageUrl}
                    name = {selectedFriend.name}
                    status = {selectedFriend.online}
                    />
                    </div>
                    {
                        conversationMessages.length > 0 && (
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
                        )
                    }
                    {
                        conversationMessages.length == 0 && (
                            <div className='body-conversation-empty'>
                            </div>
                        )
                    }
                    <form
                    onSubmit={handleSubmit(handleSendMessage)}
                    >
                        <div className='bottom-conversation'>
                            <input type='text' name='textMessage' placeholder="type your message" 
                            {...register('textMessage',{
                                required : true,
                                validate : (value) => value.trim().length != 0
                            })}
                            />
                            <button type='submit'>
                                <AiOutlineSend size={28} />
                            </button>
                        </div>
                    </form>
                </>
            )
            : (
                <div className='no-conversation-text'>
                    <div><RiMessage2Line size={100} /></div>
                    <p>Veuillez Selectionner une conversation</p>
                </div>
            )
        }
    </div>
  )
}

export default Discussion