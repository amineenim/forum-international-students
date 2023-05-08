
import React, { useState } from 'react';
import '../Styles/Main.css';
import studentsGlobe from '../assets/students-globe.jpg'
import students from '../assets/students.avif'
import conference from '../assets/conference.avif'
import university from '../assets/university.jpg'
import biblio from '../assets/biblio.jpg'
import {FaArrowLeft,FaArrowRight} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class HomeBody extends React.Component {
    constructor(props){
        super(props)
        this.state = {currentImage : 0}
    }
    images = [studentsGlobe,students,conference,university,biblio]
    changeImage(){
        this.state.currentImage === this.images.length - 1 ?
            this.setState({currentImage : 0}) : 
            (this.setState({currentImage : this.state.currentImage + 1}))
    }
    // function that sets a timer whenever the component is displayed in the UI
    componentDidMount(){
        setInterval(() => this.changeImage(),4000)
    }
    componentWillUnmount(){
        clearInterval(this.changeImage())
    }

    render(){
  return (
    <div className='home-body'>
        <Helmet>
            <title>TOGETHER | Accueil</title>
        </Helmet>
        <div className='left'>
            <h2 className='text-[#31241e] text-3xl font-bold font-serif'>Votre réussite académique à portée de main,
                où que vous soyez dans le monde !
            </h2>
            <p className='text-xl text-[#31241e] font-serif mt-[20%]'>
                Rencontrez d'autres étudiants du
                monde entier sur nos forums en ligne.
                Partagez vos expériences et élargissez
                vos horizons avec notre communauté
                d'étudiants internationaux !
            </p>
            <div className='flex items-start justify-start w-full mt-[10%]'>
                <Link to='/temoignages'>
                    <button  className='uppercase bg-color-secondary bg-color-primary-2-hover color-primary-2 color-secondary-hover border-color-secondary-hover border-2 border-color-secondary px-2 py2 rounded-3xl h-10 underline font-semibold'>
                        <span>Témoignages</span>
                    </button>
                </Link>
            </div>
        </div>
        <div className='right'>
            <div className='arrowleft w-[50%] cursor-pointer'>
                <FaArrowLeft className='arrows' onClick={() => {
                  this.state.currentImage > 0 ? this.setState({currentImage : this.state.currentImage - 1}) : this.setState({currentImage : this.images.length - 1})
                }  
                }/>
            </div>
            <img className='h-[100%] w-[100%] rounded-xl shadow-xl drop-shadow-lg shadow-blue' src={this.images[this.state.currentImage]} alt="students-holding-the-globe"/>
            <div className='arrowright cursor-pointer'>
                <FaArrowRight className='arrows' onClick={() => (
                    this.state.currentImage < this.images.length - 1 ? this.setState({currentImage : this.state.currentImage + 1}) : this.setState({currentImage : 0})
                )}/>
            </div>
        </div>
    </div>
  )

    }

}

export default HomeBody