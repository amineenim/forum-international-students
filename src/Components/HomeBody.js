
import React, { useState } from 'react';
import '../Styles/HomeBody.css';
import studentsGlobe from '../assets/students-globe.jpg'
import students from '../assets/students.avif'
import conference from '../assets/conference.avif'
import university from '../assets/university.jpg'
import biblio from '../assets/biblio.jpg'
import {FaArrowLeft,FaArrowRight} from 'react-icons/fa'

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
                <FaArrowLeft className='arrows' onClick={() => {
                  this.state.currentImage > 0 ? this.setState({currentImage : this.state.currentImage - 1}) : this.setState({currentImage : this.images.length - 1})
                }  
                }/>
            </div>
            <img src={this.images[this.state.currentImage]} alt="students-holding-the-globe"/>
            <div className='arrowright'>
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