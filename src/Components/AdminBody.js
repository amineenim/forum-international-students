
import React, { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlinePlus, AiOutlineDelete, AiOutlineClose } from 'react-icons/ai'
import {HiOutlinePencil} from 'react-icons/hi'
import {RxDoubleArrowRight, RxDoubleArrowLeft} from 'react-icons/rx'
import Publications from './Publications'
import Comments from './Comments'
import { ApiService } from '../Services/ApiService'
import { useNavigate } from 'react-router-dom'
import AuthService from '../Services/AuthService'


function AdminBody() {
    // function that verifies if the user actually is an admin 
    useEffect(() => {
        if(!AuthService.isAdmin())
        {
            navigate('/')
        }
    },[])
    const navigate = useNavigate()
    // limit of users to display per page 
    const limit_users = 4
    // state that stores the initial index from which starts the pagination of items
    const [initialIndex, setInitialIndex] = useState(0)
    // state that stores the currently displayed page 
    const [currentPage, setCurrentPage] = useState("users")
    // state that stores the current list number in pagination
    const [currentListing, setCurrentListing] = useState(1)
    // state that stores whether users data has changed
    const [usersDataHasChanged, setUsersDataHasChanged] = useState(false)
    // function that determines which text to render 
    const titleTorender = (option) => {
        switch (option) {
            case "users":
                return "Gestion des Utilisateurs"
                break;
            case "posts" :
                return "Gestion des Publications"
                break
            case "comments" :
                return "Gestion des Commentaires"
            default:
                break;
        }
    }
    // function that verifies if a number lies within a given range
    const isBetween = (x, min, max) => {
        return x >= min && x <= max
    }
    // function that counts the admins and users 
    const countUsersByType = (data) => {
        const number_of_admins = (data.filter((user) => user.role == "ROLE_ADMIN")).length
        const number_of_users = data.length - number_of_admins
        const counts = {
            admins : number_of_admins,
            users  : number_of_users
        }
        return counts
    }
    // state that stores the users list 
    const [users, setUsers] = useState([])
    useEffect(() => {
        const makeApiCall = async() =>  {
            try {
                const response = await ApiService.get('/users/')
                if(response.status === 200 && response.statusText === "OK")
                {
                    setUsers(response.data.data)
                    countUsersByType(response.data.data)
                }
            } catch (error) {
                console.log(error.response)
            }
        }
        makeApiCall()
    },[usersDataHasChanged])
    // state that stores the notification in session
    const [notification, setNotification] = useState('')
    // cleans the notification when the user goes to another sections comments/users/posts
    useEffect(() => {
        setNotification('')
    },[currentPage])
    // verifies if there's a notification in the session
    useEffect(() => {
        if(sessionStorage.getItem('success')){
            setNotification(sessionStorage.getItem('success'))
        }
    },[])
    // function that handles sending the delete request to the backend 
    const handleDeleteUser = async(id) => {
        console.log(id)
        try {
            const response = await ApiService.remove(`/users/admin?id=${id}`)
            if(response.status === 200 && response.statusText === "OK")
            {
                setUsersDataHasChanged(true)
                setNotification("Utilisateur supprimé avec succès !")
            }
        } catch (error) {
            console.log(error.response)
        }
    }
    
  return (
    <div className='admin-container'>
        <div className='admin-navigation-menu'>
            <div className={ currentPage == "users" && 'selected-option'}
            onClick={() => setCurrentPage("users")}
            >Gestion Utilisateurs</div>
            <div className={ currentPage == "posts" && 'selected-option'}
            onClick={() => setCurrentPage("posts")}
            >Gestion Publications</div>
            <div className={ currentPage == "comments" && 'selected-option'}
            onClick={() => setCurrentPage("comments")}
            >Gestion Commentaires</div>
        </div>
        <div className='admin-top'>
            <h1>
                {titleTorender(currentPage)}
            </h1>
            {
                currentPage == "users" && (
                    <div className='admin-new-user'
                    onClick={() => navigate('/admin/new')}
                    >
                        <AiOutlinePlus size={26} />
                        <p>Ajouter un utilisateur</p>
                    </div>
                )
            }
        </div>
        {
            notification && (
                <div className='success-notification'>
                    <p>{notification}</p>
                    <span
                    onClick={() => {
                        sessionStorage.removeItem("success")
                        setNotification('')
                    }}
                    ><AiOutlineClose size={26} /></span>
                </div>
            )
        }
        
        {
            currentPage == "users" && (
                <>
                    <div className='admin-users-type'>
                        <div className='total'>
                            <p>Tous</p>
                            <p className='count'>
                                {users.length}
                            </p>
                        </div>
                        <div className='total-admin'>
                            <p>Administrateurs</p>
                            <p className='count'>
                                {users && countUsersByType(users).admins}
                            </p>
                        </div>
                        <div className='total-users'>
                            <p>Utilisateurs</p>
                            <p className='count'>
                                {users && countUsersByType(users).users}
                            </p>
                        </div>
                    </div>
                    <div className='users-list'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(
                                        (user, index) => {
                                            if(index < initialIndex + limit_users)
                                            {
                                                if(initialIndex == 0)
                                                {
                                                    return (
                                                        <tr key={user.id}>
                                                            <td>{user.name}</td>
                                                            <td className='role'>{user.role}</td>
                                                            <td>
                                                                <div className='actions'>
                                                                    <p>
                                                                        <AiOutlineEye size={26} color='green' 
                                                                        onClick={()=> navigate(`/admin/users/${user.id}`)}
                                                                        />
                                                                    </p>
                                                                    <p>
                                                                        <HiOutlinePencil size={26} 
                                                                        onClick={() => navigate(`/admin/users/update/${user.id}`)}
                                                                        />
                                                                    </p>
                                                                    {
                                                                         JSON.parse(localStorage.getItem('current_user')).id !== user.id && (
                                                                            <p>
                                                                                <AiOutlineDelete size={26} color='red' 
                                                                                onClick={() => handleDeleteUser(user.id)}
                                                                                />
                                                                            </p>
                                                                        )
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }else{
                                                    if(isBetween(index, initialIndex, initialIndex + limit_users))
                                                    {
                                                        return (
                                                            <tr key={user.id}>
                                                                <td>{user.name}</td>
                                                                <td className='role'>{user.role}</td>
                                                                <td>
                                                                    <div className='actions'>
                                                                        <p><AiOutlineEye size={26} color='green'
                                                                        onClick={() => navigate(`/admin/users/${user.id}`)} 
                                                                        /></p>
                                                                        <p>
                                                                            <HiOutlinePencil size={26} 
                                                                            onClick={() => navigate(`/admin/users/update/${user.id}`)}
                                                                            />
                                                                        </p>
                                                                        {
                                                                         JSON.parse(localStorage.getItem('current_user')).id !== user.id && (
                                                                            <p>
                                                                                <AiOutlineDelete size={26} color='red' 
                                                                                onClick={() => handleDeleteUser(user.id)}
                                                                                />
                                                                            </p>
                                                                        )
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                }
                                            }
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='pagination-nav'>
                    <span className='arrow-left'>
                        <RxDoubleArrowLeft size={26}
                        onClick={() => {
                            if(initialIndex > 0 )
                            {
                                setInitialIndex(initialIndex - limit_users)
                                if(currentListing > 1){
                                    setCurrentListing(currentListing -1)
                                }
                            }
                        }}
                        />
                    </span>
                    <span className='actual-page'>
                        {currentListing}
                    </span>
                    <span className='arrow-right'>
                        <RxDoubleArrowRight size={26} 
                        onClick={() => {
                            if(initialIndex + limit_users < users.length )
                            {
                                setInitialIndex(initialIndex + limit_users)
                                setCurrentListing(currentListing + 1)
                            }
                        }}
                        />
                    </span>
                    </div>
                </>
            )
        }
        {
            currentPage == "posts" && <Publications setCurrentPage={setCurrentPage} setNotification={setNotification} />
        }
        {
            currentPage == "comments" && <Comments setCurrentPage = {setCurrentPage} setNotification={setNotification} />
        }
    </div>
  )
}

export default AdminBody