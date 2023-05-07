

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillPersonFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiService } from '../Services/ApiService'

function UpdateUserBody() {
    // state that stores the user to update 
    const [userToUpdate, setUserToUpdate] = useState(null)
    // get the user id from url 
    const userId = useParams().id
    // make the API call to get user data 
    useEffect(() => {
        const getUserData = async(id) => {
            try {
                const response = await ApiService.get(`/users/?id=${id}`)
                if(response.status === 200 && response.statusText === "OK")
                {
                    setUserToUpdate(response.data.data[0])
                }
            } catch (error) {
                console.log(error.response)
            }
        }
        getUserData(userId)
       },[])
    const navigate = useNavigate()
    //validation constraints for update user profile 
    const validationConstraints = {
        nom : {
            required : "le nom est requis *",
            pattern : {
                value : /^[a-zA-Zéè\s]+$/,
                message : "forme invalide, uniquement des lettres, espaces, [éè]"
            },
            minLength : {
                value : 8,
                message : "minimun 8 caracères"
            }
        },
        pseudo : {
            required : 'le Pseudo est requis *',
            pattern : {
                value : /^[a-zA-Z]+$/,
                message : "forme invalide, seulement des lettres A-a"
            },
            minLength : {
                value : 4,
                message : "minimun 4 caractères"
            }
        },
        email : {
            required : "le champ email est requis *",
            pattern : {
                value : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message : "adresse email invalide"
            }
        },
        role : {
            required : "le role user est requis *"
        }
    }
    const {register, handleSubmit, formState : {errors}, setValue} = useForm()
    // function that prefills the form fields
    useEffect(() => {
        if(userToUpdate){
            setValue('nom', userToUpdate.name)
            setValue('pseudo', userToUpdate.login)
            setValue('email', userToUpdate.email)
            switch (userToUpdate.role) {
                case "ROLE_ADMIN":
                    setValue("role", "admin")
                    break;
                case "ROLE_USER" :
                    setValue("role", "user")
                    break;
                default:
                    break;
            }
        }
    },[userToUpdate])
    // function that handles sending the request to API
    const handleUpdateUser = async(data) => {
        const current_user = JSON.parse(localStorage.getItem('current_user'))
        const id_user = current_user.id
        console.log(data)
        try {
            const response = await ApiService.put(`/users/admin`,{
                email : data.email,
                filiere : userToUpdate.filiere,
                login : data.pseudo,
                imageUrl : userToUpdate.imageUrl,
                promotion : userToUpdate.promotion,
                pays : userToUpdate.pays,
                password : "Test123#",
                name : data.nom,
                id : userId,
                role : data.role == "user" ? 'ROLE_USER' :'ROLE_ADMIN'
            })
            console.log(response)
        } catch (error) {
            console.log(error.response)
        }
    }
  return (
    <div className='update-user-admin'>
        <div className='top-admin-new-user'>
            <BsFillPersonFill size={36} />
            <h2>UTILISATEURS / MODIFICATION</h2>
        </div>
        <div className='update-user-by-admin'>
            <form className='update-user-byadmin-form'
            onSubmit={handleSubmit(handleUpdateUser)}
            >
                <div className='row'>
                    <div className='field'>
                        <div className='labelPlusError'>
                            <p><label htmlFor='nom'>Nom : </label></p>
                            {
                                errors?.nom && (
                                    <p className='error-text'>
                                        {errors.nom.message}
                                    </p>
                                )
                            }
                        </div>
                        <input type='text' name='nom' id='nom' 
                        {...register('nom',validationConstraints.nom)}
                        />
                    </div>
                    <div className='field'>
                        <div className='labelPlusError'>
                            <p><label htmlFor='pseudo'>Pseudo : </label></p>
                            {
                                errors?.pseudo && (
                                    <p className='error-text'>
                                        {errors.pseudo.message}
                                    </p>
                                )
                            }
                        </div>
                        <input type='text' name='pseudo' id='pseudo' 
                        {...register('pseudo', validationConstraints.pseudo)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='field'>
                        <div className='labelPlusError'>
                            <p><label htmlFor='email'>Adresse Email : </label></p>
                            {
                                errors?.email && (
                                    <p className='error-text'>
                                        {errors.email.message}
                                    </p>
                                )
                            }
                        </div>
                        <input type='email' name='email' id='email' 
                        {...register('email', validationConstraints.email)}
                        />
                    </div>
                    <div className='field'>
                        <div className='labelPlusError'>
                            <p><label htmlFor='role'>Role: </label></p>
                            {
                                errors?.role && (
                                    <p className='error-text'>
                                        {errors.role.message}
                                    </p>
                                )
                            }
                        </div>
                        <select name='role' id='role'
                        {...register('role', validationConstraints.role)}
                        >
                            <option value="">Choisir un role user</option>
                            <option value='admin'>Administrateur</option>
                            <option value='user'>Utilisateur</option>
                        </select>
                    </div>
                </div>
                <div className='last-row'>
                    <div className='confirme-field'>
                        <label for="confirme">
                            <input type='checkbox' name='confirme' id='confirme'/>
                            CONFIRME
                        </label>
                    </div>
                </div>
                <div className='buttons-section'>
                    <div className='update-user-button'>
                        <button type='submit'>Sauvegarder</button>
                    </div>
                    <div className='annuler-update'
                    onClick={() => navigate('/admin')}
                    >Annuler</div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateUserBody