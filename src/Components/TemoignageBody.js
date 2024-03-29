

import React, { useEffect, useState } from 'react'
import '../Styles/TemoignageBody.css'
import TemoignageStudent from './TemoignageStudent'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import { Helmet } from 'react-helmet';
import { ApiService } from '../Services/ApiService';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Services/AuthService';

function TemoignageBody() {
    const navigate = useNavigate()
    // state that stores whether the data from API changed or not
    const [hasDataChanged, setHasDataChanged] = useState(false)
    // state that stores the length of data array 
    const [arrayLength, setArrayLength] = useState(0)
    // state that stores whether the user is just viewing testimonials or creating/updating a testimonial
    const [isViewing, setIsViewing] = useState(true)
    const [temoignagesData, setTemoignagesData] = useState([])
    useEffect(() => {
        const makeApiCall = async() => {
            try {
                const response = await ApiService.get('/temoignages/')
                if(response.statusText === "OK" && response.status=== 200){
                    response.data && setTemoignagesData(response.data.data)
                    console.log(response.data.data)
                    setHasDataChanged(false)
                    setArrayLength(response.data.data.length)
                }
            } catch (error) {
                console.log(error)
            }
        }
        makeApiCall()
    }, [hasDataChanged])
    // verify if the user is authenticated 
    useEffect(() => {
        if(!AuthService.isAuthenticated())
        {
            navigate('/login')
        }
    },[])
    // state that holds the current testimony being displayed
    const [currentTestimony, setCurrentTestimony]= useState(0)
    // function that handles navigating between different testimonials 
    const incrementTestimonials = (previousValue) => {
        if(previousValue < temoignagesData.length - 1)
        {
            setCurrentTestimony(previousValue + 1)
        }else 
        {
            setCurrentTestimony(temoignagesData.length - 1)
        }
    }
    const decrementTestimonials = (previousValue) => {
        if(previousValue > 0)
        {
            setCurrentTestimony(previousValue - 1)
        }else 
        {
            setCurrentTestimony(0)
        }
    }
    return (
        <div className='temoignage-container'>
            <Helmet>
                <title>TOGETHER | Temoignages</title>
            </Helmet>
            {temoignagesData.map((temoignage,index) => {
                if(index === currentTestimony){
                    return (
                        <TemoignageStudent 
                        key={temoignage.id}
                        id = {temoignage.id}
                        index = {index}
                        owner = {temoignage.name}
                        userId = {temoignage.id_user}
                        image = {temoignage.imageUrl}
                        content = {temoignage.text}
                        rating = {temoignage.rating}
                        setCurrentTestimony = {setCurrentTestimony}
                        setHasDataChanged = {setHasDataChanged}
                        setIsViewing = {setIsViewing}
                        arrayLength = {arrayLength}
                        />
                )
                }
            })}
            {
                isViewing && (
                    <div className='skip'>
                        <div className='left'>
                            <FaAngleDoubleLeft size="3rem" color='orange'
                            onClick={() => decrementTestimonials(currentTestimony) }
                            />
                        </div>
                        <div className='right'>
                            <FaAngleDoubleRight size="3rem" color='orange'
                            onClick={() => incrementTestimonials(currentTestimony) }
                            />
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}

export default TemoignageBody