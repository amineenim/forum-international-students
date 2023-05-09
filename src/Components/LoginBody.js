

import React, { useEffect, useState } from 'react'
import '../Styles/LoginBody.css'
import { FaLock } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet';
import AuthService from '../Services/AuthService'
import { useNavigate } from 'react-router'

function LoginBody() {
    const navigate = useNavigate()
    // destructring the object
    const {register,handleSubmit,formState : {errors},reset, setValue} = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        reset({
            email : "",
            password:""
        })
        try {
            const response = AuthService.login(data.email, data.password)
            console.log(response)
            sessionStorage.removeItem('registrationWithSuccess')
            if(localStorage.getItem('jwt_token') != null){
                navigate('/forum')
                console.log(localStorage.getItem('jwt_token'))
            }
        } catch (error) {
            console.log(error.response)
        }
    }
    // prefills login if coming from registration
    useEffect(() => {
        if(sessionStorage.getItem('registrationWithSuccess'))
        {
            setValue("email", sessionStorage.getItem('registrationWithSuccess'))
        }
    },[])
  return (
    <div className='login-container'>
        <Helmet>
            <title>TOGETHER | Connexion</title>
        </Helmet>
        <div className='upper'>
            <h2>Se Connecter</h2>
            <h3>Pas encore de compte ? s'inscrire</h3>
            <div className='middle'>
                <div className='cadenas'>
                    <FaLock/>
                </div>
                <p>Nous ne partageons rien sans votre permission</p>
            </div>
        </div>
        <div className='lower'>
            <div className='form'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row1'>
                        <label htmlFor='email'>Email</label>
                        <input type="text" 
                        name="email"
                        autoFocus
                        id="email"
                        {...register("email",{
                             required : true
                        })}
                        />
                        {errors.email && errors.email.type === "required" &&
                        (<p className='errorMsg'>The email is required *</p>)}
                    </div>
                    <div className='row2'>
                        <label htmlFor='password'>Password</label>
                        <input type="password" 
                            name="password" 
                            id="password"
                            {...register("password",{
                                required : true,
                                minLength : 8,
                            })}
                            />
                        {errors.password && errors.password.type==="required" &&
                        (<p className='errorMsg'>The password is required *</p>)}
                        {errors.password && errors.password.type === "minLength" &&
                        (<p className='errorMsg'>the password must be at least 8 characters</p>)}
                    </div>
                    <button type='submit' className='submit-btn'><p>Connexion</p></button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginBody