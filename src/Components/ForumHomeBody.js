
import React, { useState } from 'react';
import '../Styles/Forum.css';

import {FaArrowLeft,FaArrowRight} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ApiService } from "../Services/ApiService";
import AuthService from '../Services/AuthService';

class ForumHomeBody extends React.Component {
    state = {
        categories: [],
        forums: [],
        isNewForum: false,
        titre: "",
        categorie: "",
        contenu:""
    }

    userInfo = JSON.parse(localStorage.getItem("current_user"))

    constructor(props){
        super(props)
        // this.state = {currentImage : 0}
    }
    
    async componentDidMount(){
        const categoriesResponse = await ApiService.get("/forum/categories/")
        if(categoriesResponse){
            this.setState({categories: categoriesResponse.data.data})
        }
        
        const forumsResponse = await ApiService.get("/forums/")
        if(forumsResponse){
            this.setState({forums: forumsResponse.data.data})
        }
    }
    
    componentWillUnmount(){
        
    }

    activeAddNewForum(){
        this.setState({isNewForum : true})
    }

    poster(){
        const titre = document.getElementById("titre")
        const code_categorie = document.getElementById("categorie")
        const id_user = this.userInfo.id
        const contenu = document.getElementById("contenu")
        const data = {
            "titre": titre.value,
            "code_categorie": code_categorie.value,
            "id_user": id_user,
            "contenu": contenu.value
        }
        ApiService.post("/forums/", data)
            .then( response => {
                this.setState({isNewForum : false})
                titre.value = ""
                code_categorie.value = ""
                contenu.value = ""
            })
    }

    retour(){
        this.setState({isNewForum : false})
        document.getElementById("categorie").value = ""
        document.getElementById("contenu").value = ""
        document.getElementById("titre").value = ""
    }
    render(){
        return (
            <div>
                {
                    !this.state.isNewForum ? 
                    (<div className='forum-body'>
                    <Helmet>
                        <title>TOGETHER | Forums</title>
                    </Helmet>
    
                    <div className='w-[99%] pt-6'>
                        <div className='px-10'>
                            <div className='justify-end items-end text-right'>
                                <button onClick={() => this.activeAddNewForum()} className='uppercase bg-color-primary-1 bg-color-primary-2-hover color-primary-2 color-secondary-hover border-color-secondary-hover border-2 border-color-primary-1 px-2 py2 rounded-3xl h-10 underline font-semibold'>
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
                                <select className='w-full px-2 p-2 border-2 border-color-sixth'>
                                { 
                                    this.state.categories.map((option, index) => (
                                        <option key={index} value={option.code_categorie}>{option.libelle_categorie}</option>
                                    ))
                                }
                                </select>
                            </div>
                        </div>
                    </div>  
                </div>) :
                    (<div className='px-10 pb-10'>
                        <div className='text-4xl font-bold'>
                            <span>Nouveau Poste</span>
                        </div>
                        <div className='font-extrabold mt-10 mb-2 text-xl'>
                            <span>Catégorie *</span>
                        </div>
                        <div className='w-full'>
                            <select id='categorie' name='categorie' placeholder='Sélectionnez' className='w-full px-4 py-2 border-2 border-color-sixth rounded-3xl'>
                            <option value="">Sélectionnez</option>
                            { 
                                this.state.categories.map((option, index) => (
                                    <option key={index} value={option.code_categorie}>{option.libelle_categorie}</option>
                                ))
                            }
                            </select>
                        </div>
                        <div className='font-extrabold mt-4 mb-2 text-xl'>
                            <span>Titre *</span>
                        </div>
                        <div className='w-full'>
                            <input id='titre' name='titre' placeholder='Titre du poste' className='w-full px-4 py-2 border-2 border-color-sixth'  />
                        </div>
                        <div className='font-extrabold mt-4 mb-2 text-xl'>
                            <span>Texte *</span>
                        </div>
                        <div className='w-full'>
                            <textarea id='contenu' name='contenu' placeholder='Développez vos besoins...' className='w-full min-h-[200px] p-4 border-2 border-color-sixth'>

                            </textarea>
                        </div>
                        <div className='flex'>
                            <button onClick={() => this.retour()} className='mr-4 bg-color-primary-2 bg-color-secondary-hover color-primary-1 color-primary-2-hover border-2 border-color-primary-1 px-5 py2 rounded-3xl h-10 font-semibold w-36 text-xl mt-8'>
                                <span>Annuler</span>
                            </button>
                            <button onClick={() => this.poster()} className='bg-color-primary-1 bg-color-primary-2-hover color-primary-2 color-secondary-hover border-color-secondary-hover border-2 border-color-primary-1 px-5 py2 rounded-3xl h-10 font-semibold w-36 text-xl mt-8'>
                                <span>Poster</span>
                            </button>
                        </div>
                    </div>)
                }
            </div>
        )
    }
}

export default ForumHomeBody