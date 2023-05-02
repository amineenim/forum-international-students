

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
    // state that will store friends's list 
    const [friends, setFriends] = useState([])
    useEffect(() => {
        const makeApiCall = async() => {
            const current_user = JSON.parse(localStorage.getItem('current_user'))
            try {
                const response = await ApiService.get(`/friends/?id=${current_user.id}`)
                if(response.status === 200 && response.statusText === "OK")
                {
                    response.data && setFriends(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        makeApiCall()
    },[])
    const searchRef = useRef(null)
    // state that will store the selected user to display the discussion 
    const [user, setUser] = useState(null)
  return (
    <div className='messagerie-container'>
        <Helmet>
            <title>TOGETHER | Messages</title>
        </Helmet>
        <div className='discussion'>
            <Discussion user={user} friends={friends} />
        </div>
        <div className='my-friends'>
            <div className='search'>
                <input type='text' name='search' 
                placeholder="Rechercher"
                ref={searchRef} />
                <div
                onClick={() => searchRef.current.focus()}
                >
                    <AiOutlineSearch size={26} />
                </div>
            </div>
            <div className='online'>
                <OnlineFriends friends={friends} setUser={setUser} />
                <OutFriends friends={friends} setUser={setUser} />
            </div>
        </div>
    </div>
  )
}

export default MessagerieBody