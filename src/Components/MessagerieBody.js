

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
    // state that will store friends's list 
    const [friends, setFriends] = useState([])
    useEffect(() => {
        const makeApiCall = async() => {
            try {
                const response = await ApiService.get(`/friends/?id=${current_user.id}`)
                if(response.status === 200 && response.statusText === "OK")
                {
                    response.data && setFriends(response.data.data)
                    console.log(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        makeApiCall()
    },[isNewDiscussionStarted])
    ///////////////
    useEffect(() => {
        console.log('data has changed')
    },[isNewDiscussionStarted])
    // state that stores friends of the user with whom he doesn't have a discussion 
    const [friendsWithNoDiscussion, setFriendsWithNoDiscussion] = useState([]);
    useEffect(() => {
        const getFriendsWithNoDiscussion = async() => {
            try {
                const response = await ApiService.get(`/friends/?id=${current_user.id}`)
                if(response.status === 200 && response.statusText === "OK")
                {
                    setFriendsWithNoDiscussion(response.data.data)
                    console.log(response.data.data)
                }
            } catch (error) {
                console.log(error.response)
            }
        }
        getFriendsWithNoDiscussion()
    },[isNewDiscussionStarted])
    // state that stores whether the friends with no discussion are displayed or not 
    const [isFriendsWithNoDiscussionDisplayed, setIsFriendsWithNoDiscussionDisplayed] = useState(false)
    const searchRef = useRef(null)
    // state that will store the selected user to display the discussion 
    const [user, setUser] = useState(null)

    
  return (
    <div className='messagerie-container'>
        <Helmet>
            <title>TOGETHER | Messages</title>
        </Helmet>
        <div className='discussion' >
            <Discussion user={user} friends={friends} setIsNewDiscussionStarted={setIsNewDiscussionStarted} />
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
                    !isFriendsWithNoDiscussionDisplayed && (
                        <div className='online-all'>
                            <OnlineFriends friends={friends} setUser={setUser} />
                            <OutFriends friends={friends} setUser={setUser} />
                        </div>
                    )
                }
                {
                    isFriendsWithNoDiscussionDisplayed && (
                        friendsWithNoDiscussion.map(
                            (friendWithNoDiscussion) => {
                                return (
                                    <div className='friend-nodisc-in-list' key={friendWithNoDiscussion.id}
                                    onClick={() => {
                                        if(isFriendsWithNoDiscussionDisplayed){
                                            setUser(friendWithNoDiscussion.id)
                                        }
                                    }}
                                    >
                                        <p> {friendWithNoDiscussion.name} </p>
                                        {
                                            friendWithNoDiscussion.online ? (
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
                if(isFriendsWithNoDiscussionDisplayed){
                    setIsFriendsWithNoDiscussionDisplayed(false)
                }else{
                    setIsFriendsWithNoDiscussionDisplayed(true)
                }
            }}
            >
                <p>
                    {
                        isFriendsWithNoDiscussionDisplayed ? 'Annuler' : 'Commencer une nouvelle discussion'
                    }
                </p>
            </button>
        </div>
    </div>
  )
}

export default MessagerieBody