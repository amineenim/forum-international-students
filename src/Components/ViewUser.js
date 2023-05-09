

import React, { useEffect, useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import myimage from '../assets/profiles/avatar.jpg'
import { ApiService } from '../Services/ApiService'
import '../Styles/Main.css';

function ViewUser() {
    const userId = useParams().id
    // state that stores the user to view 
    const [user, setUser] = useState(null)
   // function that brings the user data 
   useEffect(() => {
    const getUserData = async(id) => {
        try {
            const response = await ApiService.get(`/users/?id=${id}`)
            if(response.status === 200 && response.statusText === "OK")
            {
                setUser(response.data.data[0])
            }
        } catch (error) {
            console.log(error.response)
        }
    }
    getUserData(userId)
   },[])
   // function that returns the user role 
   const getUserRole = (data) => {
    switch (data) {
        case "ROLE_ADMIN":
            return "Administrateur"
            break;
        case "ROLE_USER" :
            return "Utilisateur"
        default:
            break;
    }
   }
   // function that formats data 
   const formatDate = (creationDate) => {
    const date = new Date(creationDate)
    const formattedDate = date.toLocaleDateString("en-EU",{
        weekday : "long",
        month : "short",
        day : "numeric",
        year : "numeric"
    })
    return formattedDate
   }
  return (
    <div className='view-user-admin container-bg'>
        <div className='top-admin-view-user'>
            <BsFillPersonFill size={36} />
            <h2>UTILISATEURS / FICHE</h2>
        </div>
        {
            user && (
                <div className='fiche-user'>
                    <div className='top-fiche'>
                        <img src={user.imageUrl} alt="image-profil" />
                        <p>{user.name}</p>
                    </div>
                    <div className='body-fiche'>
                        <p>
                            <strong>Nom : </strong>
                            <span> {user.name} </span>
                        </p>
                        <p>
                            <strong>Pseudo : </strong>
                            <span> {user.login} </span>
                        </p>
                        <p>
                            <strong>Adresse Email: </strong>
                            <span>{user.email}</span>
                        </p>
                        <p>
                            <strong>Date d'inscription: </strong>
                            <span>{formatDate(user.createdAt)}</span>
                        </p>
                        <p>
                            <strong>Role : </strong>
                            <span>{getUserRole(user.role)}</span>
                        </p>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ViewUser