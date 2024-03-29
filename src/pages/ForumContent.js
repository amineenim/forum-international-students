import React from 'react'
import Header from '../Components/Header'
import ForumContentBody from '../Components/ForumContentBody'
import Footer from '../Components/Footer'
import { useParams } from 'react-router-dom'

function ForumContent() {
    const { id } = useParams()
    return (
        <div>
            <div className='mb-[9%]'>
                <Header/>
            </div>
            <ForumContentBody id={id}/>
            <Footer/>
        </div>
    )
}

export default ForumContent