

import React from 'react'
import SingleFriend from './SingleFriend'
import SingleMessage from './SingleMessage'
import '../Styles/Discussion.css'

const conversationTestData = [
    {
        idEmeteur : 1,
        avatarEmeteur : 'student2.png',
        idRecepteur : 0,
        nomRecepteur : 'Amine MAOURID',
        statusRecepteur : 1,
        avatarRecepteur : 'avatar.jpg',
        messages : [
            {
                owner : 0,
                avatar : 'avatar.jpg',
                content : "hello friend, how are you ?",
                time : "10/03/2023 19:22"
            },
            {
                owner : 1,
                avatar : 'student2.png',
                content : "good, what about you friend ?",
                time : "10/03/2023 19:24"
            }
        ]
    }
]

function Discussion(props) {
  return (
    <div className='conversation'>
        {
            props.user != null ? (
                <>
                    <div className='top-conversation'>
                    <SingleFriend image={require(`../assets/profiles/${conversationTestData[0].avatarRecepteur}`)}
                    name = {conversationTestData[0].nomRecepteur}
                    status = {conversationTestData[0].statusRecepteur}
                    />
                    </div>
                    <div className='body-conversation'>
                        {
                            conversationTestData[0].messages.map(
                                message => {
                                    return <SingleMessage 
                                            content={message.content}
                                            time = {message.time}
                                            avatar = {message.avatar}
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