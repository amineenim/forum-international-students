

import React from 'react';
import {useForm} from 'react-hook-form';

function RegistrationBody() {
    // destructring the object to get specific data
    const {register,handleSubmit,formState:{errors},reset}= useForm()
    const onSubmit = (data) => console.log(data)
    const constraints = {
        name : {
            required : "the name field is required",
            minLength : {
                value : 3,
                message : "the name must be at least 3 characters"
            } 
        },
        email : {
            required : "the email is required",
            pattern : {
                value :  /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message :  "the email is invalid"
            }
        },
        password : {
            required : "the password is requiered",
            minLength : {
                value : 6,
                message : "the password must be at least 6 characters"
            },
            maxLength : {
                value : 14,
                message : "the password can't exceed 14 characters"
            } 
        },
        filiere : {
            required : "filiere is required",
            minLength : {
                value : 4,
                message : "the filiere name must be at least 4 characters"
            } 
        },
        promotion : {
            required : "promotion is required",
            min : {
                value : 2016,
                message : "la promotion doit etre supérieure a celle de 2016"
            },
            max : {
                value : 2023,
                message : "la promotion doit etre inférieure à l'année en cours"
            },
            pattern : {
                value : /\d{4}/,
                message : "la promotion doit etre une année de 4 chiffres"
            }
        }
    }
  return (
    <div className='registration-container'>
        <div className='registration-head'>
            <h2>Créer un nouveau compte et rejoingnez nous !</h2>
            <h3>Déja inscrit ? connectez-vous</h3>
        </div>
        <div className='registration-foot'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='name-field'>
                    <label htmlFor='name'>Nom</label>
                    <input type="text" 
                    name="name" 
                    autoFocus
                    id="name"
                    {...register("name",constraints.name)}
                    />
                    {errors.name && errors.name.type==="required" && 
                    <span className='error-text'>
                        {errors.name.message}
                    </span>}
                    {errors.name && errors.name.type==="minLength" && 
                    <span className='error-text'>
                        {errors.name.message}
                    </span>}
                </div>
                <div className='email-field'>
                    <label htmlFor='email'>E-mail</label>
                    <input type="email" 
                    name="email" 
                    id="email"
                    {...register("email",constraints.email)}
                    />
                    {errors.email && errors.email.type === "required" &&
                    (<span className='error-text'>
                        {errors.email.message}
                    </span>)}
                    {errors.email && errors.email.type === "pattern" &&
                    (<span className='error-text'>
                        {errors.email.message}
                    </span>)}
                </div>
                <div className='mdp-field'>
                    <label htmlFor='motdepasse'>Mot de passe</label>
                    <input type="password" 
                    name="password" 
                    id="motdepasse"
                    {...register("password",constraints.password)}
                    />
                    {errors.password && errors.password.type === "required" &&
                    (<span className='error-text'>
                        {errors.password.message}
                    </span>)}
                    {errors.password && errors.password.type === "minLength" &&
                    (<span className='error-text'>
                        {errors.password.message}
                    </span>)}
                    {errors.password && errors.password.type === "maxLength" &&
                    (<span className='error-text'>
                        {errors.password.message}
                    </span>)}
                </div>
                <div className='filiere-field'>
                    <label htmlFor='filiere'>Filiere</label>
                    <input type="text" 
                    name="filiere" 
                    id="filiere"
                    {...register("filiere",constraints.filiere)}
                    />
                    {errors.filiere && errors.filiere.type === "required" &&
                    (<span className='error-text'>
                        {errors.filiere.message}
                    </span>)}
                    {errors.filiere && errors.filiere.type === "minLength" &&
                    (<span className='error-text'>
                        {errors.filiere.message}
                    </span>)}
                </div>
                <div className='promotion-field'>
                    <label htmlFor='promotion'>Promotion</label>
                    <input type="text" 
                    name="promotion" 
                    id="promotion"
                    {...register("promotion",constraints.promotion)}
                    />
                    {errors.promotion && errors.promotion.type === "required" &&
                    (<span className='error-text'>
                        {errors.promotion.message}
                    </span>)}
                    {errors.promotion && errors.promotion.type === "min" &&
                    (<span className='error-text'>
                        {errors.promotion.message}
                    </span>)}
                    {errors.promotion && errors.promotion.type === "max" &&
                    (<span className='error-text'>
                        {errors.promotion.message}
                    </span>)}
                    {errors.promotion && errors.promotion.type === "pattern" &&
                    (<span className='error-text'>
                        {errors.promotion.message}
                    </span>)}
                </div>
                <button className='register-btn' type="submit">S'inscrire</button>
            </form>
        </div>
    </div>
  )
}

export default RegistrationBody