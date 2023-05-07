import React from 'react'
import { useForm } from 'react-hook-form'
import { BsFillPersonFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function CreateUser() {
    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}, watch} = useForm()
    const password = watch('password')
    const validationConstraints = {
        nom : {
            required : "le nom est requis",
            pattern : {
                value : /^[A-Za-z\s]+$/,
                message : 'la forme est invalide'
            },
            minLength : {
                value : 8,
                message : "le champ doit avoir comporter 8 caractères"
            }
        },
        pseudo : {
            required : "le pseudo est requis",
            pattern : {
                value : /^[A-Za-z\s]+$/,
                message : 'le champ autorise uniquement les lettres',
            },
            minLength : {
                value : 8,
                message : "mimimum 8 caractères"
            }
        },
        email : {
            required : "adresse email requise *",
            pattern : {
                value : /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
                message : "email invalide"
            }
        },
        password : {
            required : "le mot de passe est requis",
            minLength : {
                value : 8,
                message : "minimum 8 caractères"
            },
            pattern : {
                value : /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message : "doit comporter majiscule, muniscule, chiffre et un caractère spécial"
            }
        },
        confirm_password : {
            required : "confirmation mdp requise",
            validate : (value) => value === password || "confirmation ne matche pas password"
        },
        role : {
            required : "le role de l'user est requis *"
        }
    }
    // function that handles creating a user after form submission is successeful
    const handleCreateUser = async(data) => {
        console.log(data)
    }
  return (
    <div className='create-new-user-body'>
        <div className='top-admin-new-user'>
            <BsFillPersonFill size={36} />
            <h2>UTILISATEURS / CREATION</h2>
        </div>
        <div className='admin-new-user'>
            <form className='create-new-user-form'
            onSubmit={handleSubmit(handleCreateUser)}
            >
                <div className='row'>
                    <div className='field'>
                        {
                            errors?.nom && (
                                <p className='error-text'>
                                    {errors.nom.message}
                                </p>
                            )
                        }
                        <input type='text' name='nom' 
                        placeholder='Nom'
                        {...register('nom', validationConstraints.nom)}
                        />
                    </div>
                    <div className='field'>
                        {
                            errors?.pseudo && (
                                <p className='error-text'>
                                    {errors.pseudo.message}
                                </p>
                            )
                        }
                        <input type='text' name='pseudo' 
                        placeholder='Pseudo'
                        {...register('pseudo', validationConstraints.pseudo)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='field'>
                        {
                            errors?.email && (
                                <p className='error-text'>
                                    {errors.email.message}
                                </p>
                            )
                        }
                        <input type='email' name='email' 
                        placeholder='Adresse Email'
                        {...register('email', validationConstraints.email)}
                        />
                    </div>
                    <div className='field'>
                        {
                            errors?.password && (
                                <p className='error-text'>
                                    {errors.password.message}
                                </p>
                            )
                        }
                        <input type='password' name='password' 
                        placeholder='Mot de Passe'
                        {...register('password', validationConstraints.password)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='field'>
                        {
                            errors?.confirm_password && (
                                <p className='error-text'>
                                    {errors.confirm_password.message}
                                </p>
                            )
                        }
                        <input type='password' name='confirm_password' 
                        placeholder='Confirmation Mot de Passe'
                        {...register('confirm_password', validationConstraints.confirm_password)}
                        />
                    </div>
                    <div className='field'>
                        {
                            errors?.role && (
                                <p className='error-text'>
                                    {errors.role.message}
                                </p>
                            )
                        }
                        <select name="role"
                        {...register('role', validationConstraints.role)}
                        >
                            <option value="">Role Utilisateur</option>
                            <option value="admin">Administrateur</option>
                            <option value="utilisateur">Utilisateur</option>
                        </select>
                    </div>
                </div>
                <div className='buttons-row'>
                    <div className='creer-user'>
                       <button type='submit'>Ajouter</button> 
                    </div>
                    <div className='annuler-creer-user'
                    onClick={() => navigate('/admin')}
                    >
                        Annuler
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateUser