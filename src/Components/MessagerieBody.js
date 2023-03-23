

import React, { useRef, useState } from 'react'
import '../Styles/MessagerieBody.css'
import OnlineFriends from './OnlineFriends'
import OutFriends from './OutFriends'
import { AiOutlineSearch } from "react-icons/ai";
import Discussion from './Discussion';
const testdata = {
    friends : [
        {
            id : 0,
            name : 'Amine Maourid',
            status : 1,
            avatar : 'avatar.jpg'
        },
        {
            id : 1,
            name : 'edouard chevenslove',
            status : 1,
            avatar : 'student2.png'
        },
        {
            id : 2,
            name : 'Tom Olivier',
            status : 0,
            avatar : 'avatar.jpg'
        },
        {
            id : 3,
            name :'ely massi',
            status : 1,
            avatar : 'student1.jpg'
        }
    ]
}


function MessagerieBody() {
    const searchRef = useRef(null)
    // state that will store the selected user to display the discussion 
    const [user, setUser] = useState(null)
  return (
    <div className='messagerie-container'>
        <div className='discussion'>
            <Discussion user={user} />
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
                <OnlineFriends friends={testdata.friends} setUser={setUser} />
                <OutFriends friends={testdata.friends} setUser={setUser} />
            </div>
        </div>
    </div>
  )
}

export default MessagerieBody