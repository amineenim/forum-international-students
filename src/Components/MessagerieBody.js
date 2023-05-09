

import React, { useEffect, useRef, useState } from 'react'
import '../Styles/MessagerieBody.css'
import OnlineFriends from './OnlineFriends'
import OutFriends from './OutFriends'
import { AiOutlineSearch } from "react-icons/ai";
import Discussion from './Discussion';
import { Helmet } from 'react-helmet';
import { ApiService } from '../Services/ApiService';
import AuthService from '../Services/AuthService';
import { useNavigate } from 'react-router-dom';


function MessagerieBody() {
    const navigate = useNavigate()
    // verify if the user is authenticated 
    useEffect(() => {
        if(!AuthService.isAuthenticated())
        {
            navigate('/login')
        }
    },[])
    const current_user = JSON.parse(localStorage.getItem('current_user'))
    // state that stores whether the friends data has changed or not (a new discussion is started)
    const [isNewDiscussionStarted, setIsNewDiscussionStarted] = useState(false)
    // state that will store friends's list (grabs all friends)
    const [friends, setFriends] = useState([])
    useEffect(() => {
        const makeApiCall = async() => {
            try {
                const response = await ApiService.get(`/friends/?id=${current_user.id}`)
                if(response.status === 200 && response.statusText === "OK")
                {
                    response.data && setFriends(response.data.data)
                    //id 
                    console.log(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        makeApiCall()
    },[])
    ///////////////
    useEffect(() => {
        console.log('data has changed')
    },[isNewDiscussionStarted])
    // state that stores friends of the user with whom he already has a discussion 
    const [friendsWithDiscussion, setFriendsWithDiscussion] = useState([]);
    useEffect(() => {
        const getFriendsWithDiscussion = async() => {
            try {
                const response = await ApiService.get(`/messages/discussion`)
                if(response.status === 200 && response.statusText === "OK")
                {
                    setFriendsWithDiscussion(response.data.data)
                    // id_user
                    console.log(response.data.data)
                }
            } catch (error) {
                console.log(error.response)
            }
        }
        getFriendsWithDiscussion()
    },[isNewDiscussionStarted])
    // state that stores whether the friends with discussion are displayed or not 
    const [isFriendsWithDiscussionDisplayed, setIsFriendsWithDiscussionDisplayed] = useState(true)
    const searchRef = useRef(null)
    // state that will store the selected user to display the discussion 
    const [user, setUser] = useState(null)

    
  return (
    <div className='messagerie-container'>
        <Helmet>
            <title>TOGETHER | Messages</title>
        </Helmet>
        <div className='discussion' >
            <Discussion user={user} friends={friends} 
            friendsWithDiscussion = {friendsWithDiscussion}
            setIsNewDiscussionStarted={setIsNewDiscussionStarted}
            isFriendsWithDiscussionDisplayed = {isFriendsWithDiscussionDisplayed}
            />
        </div>
        <div className='my-friends'>
            <div className='search'>
                <input type='text' name='search' 
                placeholder="Rechercher"
                ref={searchRef} />
                <div
                onClick={() => searchRef.current.focus()}
                >
                    <AiOutlineSearch size={28} />
                </div>
            </div>
            <div className='online'>
                {
                    isFriendsWithDiscussionDisplayed && (
                        <div className='online-all'>
                            <OnlineFriends friends={friendsWithDiscussion} setUser={setUser} />
                            <OutFriends friends={friendsWithDiscussion} setUser={setUser} />
                        </div>
                    )
                }
                {
                    !isFriendsWithDiscussionDisplayed && (
                        friends.map(
                            (friend) => {
                                return (
                                    <div className='friend-nodisc-in-list' key={friend.id}
                                    onClick={() => {
                                        if(!isFriendsWithDiscussionDisplayed){
                                            setUser(friend.id)
                                        }
                                    }}
                                    >
                                        <p> {friend.name} </p>
                                        {
                                            friend.online ? (
                                                <span className='friend-with-nodisc-online'></span>
                                            ) : (
                                                <span className='friend-with-nodisc-outline'></span>
                                            )
                                        }
                                    </div>
                                )
                            }
                        )
                    )
                }
                
            </div>
            <button className='start-new-conversation'
            onClick={() => {
                if(isFriendsWithDiscussionDisplayed){
                    setIsFriendsWithDiscussionDisplayed(false)
                }else{
                    setIsFriendsWithDiscussionDisplayed(true)
                }
            }}
            >
                <p>
                    {
                        isFriendsWithDiscussionDisplayed ? 'commencer une nouvelle conversation' : 'Annuler' 
                    }
                </p>
            </button>
        </div>
    </div>
  )
}

export default MessagerieBody