
import React, { useState } from 'react';
import '../Styles/Forum.css';

import {FaArrowLeft,FaArrowRight} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class ForumHomeBody extends React.Component {
    constructor(props){
        super(props)
        // this.state = {currentImage : 0}
    }
    
    componentDidMount(){
        
    }
    componentWillUnmount(){
        
    }

    render(){
        return (
            <div className='forum-body'>
                <Helmet>
                    <title>TOGETHER | Forums</title>
                </Helmet>

                <div className='w-[99%] pt-6'>
                    <div className='px-10'>
                        <div className='justify-end items-end text-right'>
                            <button className='uppercase bg-color-primary-1 color-primary-2 px-2 py2 rounded-3xl h-10 underline font-semibold'>
                                <span>Créer un nouveau poste</span>
                            </button>
                        </div>
                        <div className='flex justify-center items-center text-center mb-8'>
                            <span className='uppercase color-primary-2 text-3xl'>
                                Forums
                            </span>
                        </div>
                        <div className='color-primary-2 font-semibold'>
                            <p>
                                Créez un réseau avec vos pairs, débattez de sujets d'actualité et échangez des connaissances 
                                avec d'autres uTesters. Lancez une discussion ou rejoignez-en une qui est déjà en cours. 
                                Consultez la Foire aux questions avant de la poster ici !
                            </p>
                        </div>
                        <div className='bg-color-primary-2 px-10 mt-8 rounded-md py-8'>
                            <div className='text-color-principal font-bold'>
                                <h5>Sujet : Nouveau à l'Université de Corse ? Commencez ici</h5>
                            </div>
                            <div className='text-black font-bold text-2xl'>
                                <h2>Vous avez une question sur l'Université de Corse ? Consultez d'abord cette page !</h2>
                            </div>
                            <div className='text-color-principal font-medium'>
                                <p>
                                    Chaque année, nous avons de nouveaux étudiants qui découvrent l'Université de Corse 
                                    pour la première fois. Nous souhaitons la bienvenue à tous les nouveaux étudiants 
                                    et membres de la communauté, et nous sommes impatients que vous commenciez à apprendre, 
                                    à gagner et à vous connecter avec nous à l'Université de Corse.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full bg-color-primary-2 mt-10 py-2'>
                    <div className='w-[99%] px-10'>
                        <div className='w-full'>
                            <select className='w-full uppercase px-2 p-2 border-2 border-color-sixth'>
                                <option>Toutes les catégories</option>
                                <option>Notre première catégorie</option>
                                <option>Notre seconde catégorie</option>
                                <option>Notre troisième catégorie</option>
                            </select>
                        </div>
                        <div>
                            
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default ForumHomeBody