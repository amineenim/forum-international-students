

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
    const [errorNotification, setErrorNotification] = useState("")
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

    const {register, handleSubmit, formState : {errors}, setValue, watch} = useForm()
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
    // state that stores whether the user is updating his password 
    const [isPasswordBeingUpdated, setIsPasswordBeingUpdated] = useState(false)
    // watch the new_password and confirm_password input values 
    const new_password = watch('new_password')
    const confirm_password = watch('confirm_password')
    // validation constraints for password update 
    const passwordValidation = {
        old_password : {required : 'le mot de passe actuel est requis'},
        new_password : {
            required : "champ requis",
            pattern : {
                value : /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).+$/,
                message :'une majuscule, miniscule, chiffre et caractère spécial'
            },
            minLength : {
                value : 8,
                message : " longueur minimade de 8 caractères"
            }
        },
        confirm_password : {
            required : "confirmation requise",
            validate : value => value === new_password || "passwords don't match"
        }
    }
    // function that handles sending the password update request to the backend 
    const handlePasswordUpdate = async(data) => {
        setValue('old_password',"")
        setValue('new_password',"")
        setValue('confirm_password',"")
        try {
            const response = await ApiService.put('/users/password',{
                old_password : data.old_password,
                new_password : data.new_password,
                confirm_password : data.confirm_password
            })
            if(response.status === 200 && response.statusText === "OK")
            {
                setNotification("Mot de passe modifié avec succès")
                setIsPasswordBeingUpdated(false)
            }
        } catch (error) {
            if(error.response.status === 400 && error.response.statusText === "BAD REQUEST")
            {
                setErrorNotification("Le Mot de Passe fourni est incorrect")
            }else
            {
                console.log(error.response)
            }
        }
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
        {
            errorNotification && (
                <div className='error-update-profile'>
                    <p>
                        {errorNotification}
                    </p>
                    <span>
                        <AiOutlineClose size={26} 
                        onClick={() => setErrorNotification("")}
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
                    (authenticatedUser && !isProfileBeingUpdated && !isPasswordBeingUpdated) && (
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
                    (isProfileBeingUpdated && !isPasswordBeingUpdated) && (
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
                {
                    (isPasswordBeingUpdated && !isProfileBeingUpdated) && (
                        <form className='update-password-user'
                        onSubmit={handleSubmit(handlePasswordUpdate)}
                        >
                            <div className='row'>
                                <p>Mot de Passe Actuel : </p>
                                <div>
                                    <input type='password' name='old_password' 
                                    {...register('old_password',passwordValidation.old_password)}
                                    />
                                    {
                                        errors?.old_password && (
                                            <small className='error-text'>
                                                {errors.old_password.message}
                                            </small>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='row'>
                                <p>Nouveau Mot de passe : </p>
                                <div>
                                    <input type='password' name='new_password' 
                                    {...register('new_password', passwordValidation.new_password)}
                                    />
                                    {
                                        errors?.new_password && (
                                            <small className='error-text'>
                                                {errors.new_password.message}
                                            </small>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='row'>
                                <p>Confirmez le Nouveau MDP : </p>
                                <div>
                                    <input type='password' name='confirm_password' 
                                    {...register('confirm_password', passwordValidation.confirm_password)}
                                    />
                                    {
                                        errors?.confirm_password && (
                                            <small className='error-text'>
                                                {errors.confirm_password.message}
                                            </small>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='last-row'>
                                <button type='submit' className='modify-password'>
                                    Sauvegarder
                                </button>
                                <button
                                onClick={() => {setIsPasswordBeingUpdated(false)}}
                                >Annuler</button>
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
                    onClick={() => {
                        setIsProfileBeingUpdated(true) 
                        setIsPasswordBeingUpdated(false)
                    }}
                    >Modifier Profile</button>
                </div>
                <div className='change-password'>
                    <RiLockPasswordFill size={38} />
                    <button className='btn'
                    onClick={() => {
                        setIsPasswordBeingUpdated(true) 
                        setIsProfileBeingUpdated(false)
                        }}>Changer Mot de passe</button>
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