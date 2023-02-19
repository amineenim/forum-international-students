
import React, { useState } from 'react';
import '../Styles/HomeBody.css';
import studentsGlobe from '../assets/students-globe.jpg'
import students from '../assets/students.avif'
import conference from '../assets/conference.avif'
import university from '../assets/university.jpg'
import biblio from '../assets/biblio.jpg'
import {FaArrowLeft,FaArrowRight} from 'react-icons/fa'

function HomeBody() {
    const images = [studentsGlobe,students,conference,university,biblio]
    const [currentImage,setCurrentImage] = useState(0)
  return (
    <div className='home-body'>
        <div className='left'>
            <h2>Votre réussite académique à portée de main,
                où que vous soyez dans le monde !
            </h2>
            <p>
                Rencontrez d'autres étudiants du
                monde entier sur nos forums en ligne.
                Partagez vos expériences et élargissez
                vos horizons avec notre communauté
                d'étudiants internationaux !
            </p>
            <button className='btn'>Témoignages</button>
        </div>
        <div className='right'>
            <div className='arrowleft'>
                <FaArrowLeft className='arrows' onClick={() => (
                   currentImage > 0 ? setCurrentImage(prevState => prevState - 1) : setCurrentImage(images.length-1)
                )  
                }/>
            </div>
            <img src={images[currentImage]} alt="students-holding-the-globe"/>
            <div className='arrowright'>
                <FaArrowRight className='arrows' onClick={() => (
                    currentImage < images.length-1 ? setCurrentImage(prevState => prevState + 1) : setCurrentImage(0)
                )}/>
            </div>
        </div>
    </div>
  )
}

export default HomeBody