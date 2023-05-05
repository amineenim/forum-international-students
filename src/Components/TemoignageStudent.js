

import React, { useEffect, useState } from 'react';
import {FaStar} from 'react-icons/fa';
import {AiOutlineClose, AiOutlineDelete, AiOutlineEdit, AiOutlinePlus} from 'react-icons/ai'
import { useForm } from 'react-hook-form';
import { ApiService } from '../Services/ApiService';
import AuthService from '../Services/AuthService';
import { useNavigate } from 'react-router-dom';

function TemoignageStudent(props) {
    const navigate = useNavigate()
    const current_user = JSON.parse(localStorage.getItem('current_user'))
    const initialStyle = {color : "white"}
    const finalStyle = {color : "brown"}
    // state that stores a success notification 
    const [successNotification, setSuccessNotification] = useState("")
    useEffect(() => {
        if(sessionStorage.getItem('success')){
            setSuccessNotification(sessionStorage.getItem('success'))
        }else if(sessionStorage.getItem('failure')){
            setFailureNotification(sessionStorage.getItem("failure"))
        }
    },[])
    // state that stores a failure notification
    const [failureNotification, setFailureNotification] = useState("")
    useEffect(() => {
        if(!AuthService.isAuthenticated())
        {
            navigate('/login')
        }
    },[])
    // state that stores whether the user is creating a new testimonial
    const [isTestimonialBeingCreated, setIsTestimonialBeingCreated] = useState(false)
    const {register, handleSubmit, formState: {errors}, setValue} = useForm()
    const validationConstraintsForCreation = {
        content : {
            required : "le texte du témoignage est requis *",
            pattern : {
                value : /^[a-zA-Zéèê.,'!?à ]+$/,
                message : "uniquement des lettres, espaces, [éèê,. ]"
            },
            minLength : {
                value : 30,
                message : "minimum 30 caractères"
            },
            maxLength : {
                value : 300,
                message : "ne pas dépasser 300 caractères"
            }
        },
        rating : {
            required : "le champ rating est requis * "
        }
    }
    // function that handles creating a new testimony 
    const handleCreateTestimonial = async(data) => {
        try {
            const response = await ApiService.post('/temoignages/',{
                id_user : current_user.id,
                rating : data.rating,
                text : data.content
            })
            console.log(response)
            if(response.status === 200 && response.statusText === "OK")
            {
                props.setHasDataChanged(true)
                sessionStorage.setItem('success',"Témoignage crée avec succès !")
                setIsTestimonialBeingCreated(false)
                props.setIsViewing(true)
                props.setCurrentTestimony(props.arrayLength)
                setValue('content',"")
                setValue("rating","")
            }
        } catch (error) {
            console.log(error.response)
        }
    }
    // state that stores whether the user is updating his testimony
    const [isTestimonialBeingUpdated, setIsTestimonialBeingUpdated] = useState(false)
    // function that handles updating a testimony 
    const handleUpdateTestimonial = async(data) => {
        try {
            const response = await ApiService.put(`/temoignages/`,{
                id : props.id,
                rating : data.rating,
                text : data.content 
            })
            if(response.status === 200 && response.statusText === "OK")
            {
                props.setHasDataChanged(true)
                setSuccessNotification("Témoignage mis à jour avec succès !")
                setIsTestimonialBeingUpdated(false)
                props.setCurrentTestimony(props.index)
                props.setIsViewing(true)
            }
        } catch (error) {
            console.log(error.response)
            if(error.response.status === 404 && error.response.statusText === "NOT FOUND")
            {
                setFailureNotification("something went wrong !")
            }
        }
    }
    // function that prefills the fields for the update testimony
    useEffect(() => {
        if(isTestimonialBeingUpdated)
        {
            setValue("content", props.content)
            setValue("rating", props.rating)
        }else{
            setValue("content","")
            setValue("rating","")
        }
    },[isTestimonialBeingUpdated])
    // function that handles deleting a testimonial
    const handleDeleteTestimonial = async() => {
        try {
            const response = await ApiService.remove(`/temoignages/?id=${props.id}`)
            if(response.status === 200 && response.statusText === "OK")
            {
                props.setHasDataChanged(true)
                props.setCurrentTestimony(0)
                sessionStorage.setItem('success', "Témoignage supprimé avec succès !")
            }
        } catch (error) {
            console.log(error.response)
        }
    }
  return (
    <>
        {
            successNotification && (
                <div className='success-notification'>
                    <p>{successNotification}</p>
                    <span
                    onClick={() => {
                        setSuccessNotification("")
                        sessionStorage.setItem('success',"")
                    }}
                    >
                        <AiOutlineClose size={26} />
                    </span>
                </div>
            )
        }
        {
            failureNotification && (
                <div className='failure-notification'>
                    <p>{failureNotification}</p>
                    <span
                    onClick={() => setFailureNotification("")}
                    >
                        <AiOutlineClose size={26} />
                    </span>
                </div>
            )
        }
        <div className='temoignage-student-big-container'>
            {
                (!isTestimonialBeingCreated && !isTestimonialBeingUpdated) && (
                    <>
                        <div className='temoignage-student'>
                            <img src={props.image} alt="image-student"/>
                            <div className='data-temoignage'>
                                <h4 className='temoignage-owner'>
                                    {props.owner}
                                </h4>
                                <p className='testimony'>
                                    {props.content}
                                </p>
                                <div className='rating'>
                                    {
                                    (() => {
                                        let stars = []
                                        for(let i=0; i<5; i++)
                                        {
                                        i < props.rating ? stars.push(<FaStar key={i} style={finalStyle} size="2rem"/>) : stars.push(<FaStar key={i} style={initialStyle} size="2rem"/>)
                                        }
                                        return stars 
                                    })()}
                                </div>
                            </div>
                        </div>
                        <div className='manipulate-testimonial'>
                            <div className='add-new-testimonial'
                            onClick={() => {
                                setIsTestimonialBeingCreated(true)
                                setIsTestimonialBeingUpdated(false)
                                props.setIsViewing(false)
                            }}
                            >
                                <p>Ajouter Un Témoignage</p>
                                <AiOutlinePlus size={26} />
                            </div>
                            {
                                props.userId === current_user.id && (
                                    <div className='edit-testimonial'
                                    onClick={() => {
                                        setIsTestimonialBeingCreated(false)
                                        setIsTestimonialBeingUpdated(true)
                                        props.setIsViewing(false)
                                    }}
                                    >
                                        <p>Modifier </p>
                                        <AiOutlineEdit size={26} />
                                    </div>
                                )
                            }
                            {
                                props.userId === current_user.id && (
                                    <div className='delete-testimonial'
                                    onClick={() => handleDeleteTestimonial()}
                                    >
                                        <p>Supprimer </p>
                                        <AiOutlineDelete size={26} />
                                    </div>
                                )
                            }
                        </div>
                </>
            )
        }
        {
            (isTestimonialBeingCreated && !isTestimonialBeingUpdated) && (
                <form className='create-new-temoignage'
                onSubmit={handleSubmit(handleCreateTestimonial)}
                >
                    <div className='row'>
                        <label htmlFor='content'>
                            Témoignage :
                            {errors?.content && (
                                <span className='error-text'>
                                    {errors.content.message}
                                </span>
                            )}
                        </label>
                        <textarea name='content' id='content' 
                        placeholder='Tapez votre rémoignage...' 
                        rows={10}
                        {...register('content',validationConstraintsForCreation.content)}
                        />
                    </div>
                    <div className='row'>
                        <label htmlFor='rating'>
                            Evaluation : 
                            {errors?.rating && (
                                <span className='error-text'>
                                    {errors.rating.message}
                                </span>
                            )}
                        </label>
                        <select name='rating' id='rating'
                        {...register('rating', validationConstraintsForCreation.rating)}
                        >
                            <option value="">Evaluez votre satisfaction du Forum</option>
                            {
                                [1, 2, 3, 4, 5].map(
                                    (element) => {
                                        return (
                                            <option value={element} key={element}>
                                                {element}
                                            </option>
                                        )
                                    }
                                )
                            }
                        </select>
                    </div>
                    <div className='buttons-section'>
                        <button type='submit'>Créer Témoignage</button>
                        <button
                        onClick={() => {
                            setIsTestimonialBeingCreated(false)
                            props.setIsViewing(true)
                        }}
                        > Annuler </button>
                    </div>
                </form>
            )
        }
        {
            (isTestimonialBeingUpdated && !isTestimonialBeingCreated) && (
                <form className='create-new-temoignage'
                    onSubmit={handleSubmit(handleUpdateTestimonial)}
                    >
                        <div className='row'>
                            <label htmlFor='content'>
                                Témoignage :
                                {errors?.content && (
                                    <span className='error-text'>
                                        {errors.content.message}
                                    </span>
                                )}
                            </label>
                            <textarea name='content' id='content' 
                            placeholder='Tapez votre rémoignage...' 
                            rows={10}
                            {...register('content',validationConstraintsForCreation.content)}
                            />
                        </div>
                        <div className='row'>
                            <label htmlFor='rating'>
                                Evaluation : 
                                {errors?.rating && (
                                    <span className='error-text'>
                                        {errors.rating.message}
                                    </span>
                                )}
                            </label>
                            <select name='rating' id='rating'
                            {...register('rating', validationConstraintsForCreation.rating)}
                            >
                                <option value="">Evaluez votre satisfaction du Forum</option>
                                {
                                    [1, 2, 3, 4, 5].map(
                                        (element) => {
                                            return (
                                                <option value={element} key={element}>
                                                    {element}
                                                </option>
                                            )
                                        }
                                    )
                                }
                            </select>
                        </div>
                        <div className='buttons-section'>
                            <button type='submit'>Sauvegarder</button>
                            <button
                            onClick={() => {
                                setIsTestimonialBeingUpdated(false)
                                props.setIsViewing(true)
                            }}
                            > Annuler </button>
                        </div>
                    </form>
            )
        }
        </div>
    </>
  )
}

export default TemoignageStudent