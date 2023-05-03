

import React, { useEffect, useState } from 'react'
import '../Styles/TemoignageBody.css'
import TemoignageStudent from './TemoignageStudent'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import { Helmet } from 'react-helmet';
import { ApiService } from '../Services/ApiService';


function TemoignageBody() {
    const [temoignagesData, setTemoignagesData] = useState([])
    useEffect(() => {
        const makeApiCall = async() => {
            try {
                const response = await ApiService.get('/temoignages/')
                if(response.statusText === "OK" && response.status=== 200){
                    response.data && setTemoignagesData(response.data.data)
                    console.log(response.data.data.length)
                }
            } catch (error) {
                console.log(error)
                console.log('err')
            }
        }
        makeApiCall()
    }, [])
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
                        owner = {temoignage.name}
                        image = {temoignage.imageUrl}
                        content = {temoignage.text}
                        rating = {temoignage.rating}
                        />
                )
                }
            })}
            <div className='skip'>
                <div className='left'>
                    <FaAngleDoubleLeft size="2rem"
                    onClick={() => decrementTestimonials(currentTestimony) }
                    />
                </div>
                <div className='right'>
                    <FaAngleDoubleRight size="2rem"
                    onClick={() => incrementTestimonials(currentTestimony) }
                    />
                </div>
            </div>
        </div>
    )
}

export default TemoignageBody