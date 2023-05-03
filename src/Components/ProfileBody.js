

import React, { useEffect, useState } from 'react';
import '../Styles/ProfileBody.css';
import Profile from './Profile';
import {BsFillFilePersonFill} from 'react-icons/bs';
import {RiLockPasswordFill} from 'react-icons/ri';
import {FiLogOut} from 'react-icons/fi'
import { Helmet } from 'react-helmet';
import AuthService from '../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ApiService } from '../Services/ApiService';
import { AiOutlineClose } from 'react-icons/ai';

function ProfileBody() {
    // state that stores the currently athenticated user 
    const [authenticatedUser, setAuthenticateduser] = useState(null)
    // state that will store a notification after submission of profile edit form
    const [notification, setNotification] = useState("")
    const navigate = useNavigate()
    // verifies f the user is authenticated
    useEffect(() => {
        if(!AuthService.isAuthenticated())
        {
            navigate('/login')
        }else
        {
            const current_user = JSON.parse(localStorage.getItem('current_user'))
            setAuthenticateduser(current_user)
        }
    },[])
    // state that stores whether the user is updating his profile or not
    const [isProfileBeingUpdated, setIsProfileBeingUpdated] = useState(false)

    const {register, handleSubmit, formState : {errors}, setValue} = useForm()
    // validation constraints for user profile update 
    const validationConstraints = {
        email : {
            required : "le champ email est requis",
            pattern : {
                value : /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/,
                message : "forme invalide"
            }
        },
        imageUrl : {
            required : "l'url de l'image est requis",
            pattern : {
                value : /^https?:\/\/[\w-]+\.[\w-]+\S*$/,
                message : "url invalide"
            }
        },
        filiere : {
            required : "la filiere est requise",
            pattern : {
                value :   /^[a-zA-Z][a-zA-Z0-9\s]{3,}[a-zA-Z]$/,
                message : "le champ doit comporter uniquement des lettres,chiffres,espaces"
            },
            minLength : {
                value : 4,
                message : " le nom de filière doit avoir 4 caractères mimimum"
            }
        },
        name : {
            required : " le champ nom et prènom est requis",
            pattern : {
                value : /^[a-zA-Z\s]+$/,
                message : 'forme invalide uniquement des lettres, espaces'
            },
            minLength : {
                value : 6,
                message : "minimum 6 caractères"
            }
        },
        promotion : {
            required : "la promotion est requise",
            pattern : {
                value : /^(201[0-1]|20[2-9][0-9]|202[0-2])-(201[0-1]|20[2-9][0-9]|202[0-2])$/,
                message : "forme invalide, forme attendue YYYY-YYYY"
            }
        }
    }
    // function that handles the form submission after validation success
    const handleProfileUpdate = async(data) => {
        console.log(data)
        // make the Api call to update data of the user 
        try {
            const response = await ApiService.put('/users/profil',{
                email : data.email,
                filiere : data.filiere,
                imageUrl : data.imageUrl,
                name : data.name,
                promotion : data.promotion
            })
            if(response.status === 200 && response.statusText === "OK")
            {
                setNotification("Profil mis à jour avec succès !")
                localStorage.setItem("current_user", JSON.stringify({
                    email : data.email,
                    filiere : data.filiere,
                    id : authenticatedUser.id,
                    imageUrl : data.imageUrl,
                    login : authenticatedUser.login,
                    name : data.name,
                    promotion : data.promotion
                }))
                setIsProfileBeingUpdated(false)
                console.log("done")
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    // function that prefills the form with corresponding values 
    useEffect(() => {
        if(isProfileBeingUpdated)
        {
            setValue('email', authenticatedUser.email)
            setValue('imageUrl', authenticatedUser.imageUrl)
            setValue('filiere', authenticatedUser.filiere)
            setValue('name', authenticatedUser.name)
            setValue('promotion', authenticatedUser.promotion)
        }else {
            if(AuthService.isAuthenticated())
            {
                const current_user = JSON.parse(localStorage.getItem('current_user'))
                setAuthenticateduser(current_user)
            }
        }
    },[isProfileBeingUpdated])
    // function called after clicking the logout button 
    const handleLogOut = () => {
        AuthService.logout()
        navigate('/login')
    }
  return (
    <div className='big-container-profile'>
        {
            notification && (
                <div className='notification-update-profile'>
                    <p>
                        {notification}
                    </p>
                    <span>
                        <AiOutlineClose size={26} 
                        onClick={() => setNotification("")}
                        />
                    </span>
                </div>
            )
        }
        <div className='profile-container'>
            <Helmet>
                <title>TOGETHER | Profil</title>
            </Helmet>
            <div className='left-section'>
                {
                    (authenticatedUser && !isProfileBeingUpdated) && (
                        <Profile
                            image={authenticatedUser.imageUrl}
                            name = {authenticatedUser.name}
                            email = {authenticatedUser.email}
                            filiere = {authenticatedUser.filiere}
                            promotion = {authenticatedUser.promotion}
                        />
                    )
                }
                {
                    isProfileBeingUpdated && (
                            <form className='form-update-userprofile'
                            onSubmit={handleSubmit(handleProfileUpdate)}
                            >
                                <div className='row'>
                                    <p>Email : </p>
                                    <div>
                                        <input type='email' name='email' 
                                        {...register('email', validationConstraints.email)}
                                        />
                                        {
                                            errors?.email && (
                                                <small className='error-text'>
                                                    {errors.email.message}
                                                </small>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <p>imgae URL : </p>
                                    <div>
                                        <input type='text' name='imageUrl' 
                                        {...register('imageUrl', validationConstraints.imageUrl)}
                                        />
                                        {
                                            errors?.imageUrl && (
                                                <small className='error-text'>
                                                    {errors.imageUrl.message}
                                                </small>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <p>filière : </p>
                                    <div>
                                        <input type='text' name='filiere' 
                                        {...register('filiere', validationConstraints.filiere)}
                                        />
                                        {
                                            errors?.filiere && (
                                                <small className='error-text'>
                                                    {errors.filiere.message}
                                                </small>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <p>Nom et prénom : </p>
                                    <div>
                                        <input type='text' name='name' 
                                        {...register('name', validationConstraints.name)}
                                        />
                                        {
                                            errors?.name && (
                                                <small className='error-text'>
                                                    {errors.name.message}
                                                </small>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <p>Promotion : </p>
                                    <div>
                                        <input type='text' name='promotion' 
                                        {...register('promotion', validationConstraints.promotion)}
                                        />
                                        {
                                            errors?.promotion && (
                                                <small className='error-text'>
                                                    {errors.promotion.message}
                                                </small>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <button className='modifier-user' type='submit'>Enregistrer</button>
                                </div>
                            </form>
                    )
                }
            </div>
            <div className='right-section'>
                <h3>Actions To take : </h3>
                <div className='modify-profile'>
                    <BsFillFilePersonFill size={38} />
                    <button className='btn'
                    onClick={() => setIsProfileBeingUpdated(true)}
                    >Modifier Profile</button>
                </div>
                <div className='change-password'>
                    <RiLockPasswordFill size={38} />
                    <button className='btn'>Changer Mot de passe</button>
                </div>
                <div className='deconnecter'>
                    <FiLogOut size={38} />
                    <button className='btn'
                    onClick = {() => handleLogOut()}
                    >Se Déconnecter</button>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default ProfileBody