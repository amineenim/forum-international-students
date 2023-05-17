
import React, { useState } from 'react';
import '../Styles/Forum.css';

import {FaArrowLeft,FaArrowRight} from 'react-icons/fa'
import { Link, useNavigate, browserHistory, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ApiService } from "../Services/ApiService";
import AuthService from '../Services/AuthService';
import commentImg from '../assets/comment.png';
import flagImg from '../assets/flag-solid.svg';
import threeArrow from '../assets/chevron-triple.png';


class ForumHomeBody extends React.Component {
    state = {
        categories: [],
        forums: [],
        isNewForum: false,
        titre: "",
        categorie: "",
        contenu:"",
        tabs : "new_reply",
    }

    userInfo = JSON.parse(localStorage.getItem("current_user"))

    constructor(props){
        super(props)
        console.log(props, "props")
        // this.state = {currentImage : 0}
    }
    
    async componentDidMount(){
        const categoriesResponse = await ApiService.get("/forum/categories/")
        if(categoriesResponse){
            this.setState({categories: categoriesResponse.data.data})
        }

        await this.getForums()
    }

    async getForums(tri="new_reply", code_categorie = ""){
        const forumsResponse = await ApiService.get(`/forums/?tri=${tri}&code_categorie=${code_categorie}`)
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

    async changeTab(tab){
        this.setState({tabs : tab})
        const code_categorie = document.getElementById("categorie-chox").options[document.getElementById("categorie-chox").selectedIndex].value
        await this.getForums(tab, code_categorie)
    }

    async onChangeCategorie(){
        const code_categorie = document.getElementById("categorie-chox").options[document.getElementById("categorie-chox").selectedIndex].value
        await this.getForums(this.state.tabs, code_categorie)
    }
    render(){
        return (
            <div>
                <Helmet>
                    <title>TOGETHER | Forums</title>
                </Helmet>
                {
                    !this.state.isNewForum ? 
                    (<div className='forum-body'>
                    
                    <div className='w-[99%] pt-6'>
                        <div className='px-[10%]'>
                            <div className='justify-end items-end text-right mb-[4%]'>
                                <button onClick={() => this.activeAddNewForum()} className='uppercase bg-color-primary-1 bg-color-primary-2-hover color-primary-2 color-secondary-hover border-color-secondary-hover border-2 border-color-primary-1 px-2 py2 rounded-3xl h-10 underline font-semibold'>
                                    <span>Créer un nouveau post</span>
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
                                    avec d'autres étudiants. Lancez une discussion ou rejoignez-en une qui est déjà en cours. 
                                    Consultez la Foire aux questions avant de la poster ici !
                                </p>
                            </div>
                            <div className='bg-color-primary-2 px-[1%] mt-8 rounded-md py-8'>
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
                        <div className='w-[99%] px-[10%]'>
                            <div className='w-full'>
                                <select id='categorie-chox' name='categorie-chox' onChange={() => this.onChangeCategorie()} className='w-full px-2 p-2 border-2 border-color-sixth'>
                                <option value="">Sélectionnez</option>
                                { 
                                    this.state.categories.map((option, index) => (
                                        <option key={index} value={option.code_categorie}>{option.libelle_categorie}</option>
                                    ))
                                }
                                </select>
                            </div>
                            <div className='flex mt-6 border-b-4 w-full border-text-color-principal'>
                                <div onClick={() => this.changeTab('new_reply')} className={`${this.state.tabs == 'new_reply' ? 'border-b-8 font-bold' : ''} mr-4 cursor-pointer border-color-primary-1 text-xl`}>Réponses récentes</div>
                                <div onClick={() => this.changeTab('new_forum')} className={`${this.state.tabs == 'new_forum' ? 'border-b-8 font-bold' : ''} mr-4 cursor-pointer border-color-primary-1 text-xl`}>Nouvellement créées</div>
                                <div onClick={() => this.changeTab('most_reply')} className={`${this.state.tabs == 'most_reply' ? 'border-b-8 font-bold' : ''} mr-4 cursor-pointer border-color-primary-1 text-xl`}>Plus de reponses</div>
                            </div>
                            <div className='mt-4 pb-16'>
                                { 
                                    this.state.forums.map((option, index) => (
                                        <div className="grid grid-cols-5 grid-rows-2 gap-2 mb-[2%] border-b-2 border-text-color-principal pb-[4%]">
                                            <div className="col-span-4">
                                                <div className='font-semibold flex'>
                                                    <div className='mr-2'>
                                                        <img src={option.imageUrl} alt="" className="profile-picture" />
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <span>{option.name} ({option.pays}) - {option.filiere}</span>
                                                        </div>
                                                        <div>
                                                            <span>{new Date(option.createdAt).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex'>
                                                <div className='flex items-center justify-end w-full'><img title='Reporter' className='h-6 w-6 cursor-pointer' src={flagImg} /></div>
                                            </div>
                                            <div className="col-span-4">
                                                <div className='uppercase text-xl font-semibold flex items-center'>
                                                    <div style={{ backgroundColor: option.color }} className='h-4 w-4'></div>
                                                    <div className='ml-2'>
                                                        <span>{option.libelle_categorie}</span>
                                                    </div>
                                                </div>
                                                <div className='font-extrabold underline cursor-pointer'><NavLink to={'/forum/'+option.id}>{option.titre}</NavLink></div>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='flex items-center justify-end w-full'><NavLink to={'/forum/'+option.id}><img title='Commenter' className='cursor-pointer' src={commentImg}  alt='Commenter'/></NavLink></div>
                                                <div className='text-xl font-semibold ml-2'><span>{option.comment_number}</span></div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div> 
                </div>) :
                    (<div className='px-[10%] pb-10 pt-6'>
                        <div className='w-full flex items-center bg-[#f1f4f8] py-4 px-2 rounded-2xl text-[#71727c] uppercase font-semibold'>
                            <div><span className='text-2xl mr-4'>Forums</span></div>
                            <div><img className='h-8 w-10 mr-4' src={threeArrow} /></div>
                            <div><span className='mr-6 text-2xl'>/</span></div>
                            <div className='text-2xl font-bold'>
                                <span>Nouveau Post</span>
                            </div>
                        </div>
                        
                        <div className='font-extrabold mt-6 mb-2 text-xl'>
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
                            <input id='titre' name='titre' placeholder='Titre du post' className='w-full px-4 py-2 border-2 border-color-sixth'  />
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