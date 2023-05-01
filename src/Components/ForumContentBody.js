
import React, { useState } from 'react';
import '../Styles/Forum.css';

import {FaArrowLeft,FaArrowRight} from 'react-icons/fa'
import { Link, useNavigate, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ApiService } from "../Services/ApiService";
import AuthService from '../Services/AuthService';
import lightHeart from '../assets/heart-regular.svg';
import solidHeart from '../assets/heart-solid.svg';
import threeArrow from '../assets/chevron-triple.png';
import flagImg from '../assets/flag-solid.svg';
import linkedInImg from '../assets/linkedin-in.svg'
import notificationImg from '../assets/bell-solid.svg'
import twitterImg from '../assets/twitter.svg'

class ForumContentBody extends React.Component {
    state = {
        categories: [],
        forums: [],
        isNewForum: false,
        titre: "",
        categorie: "",
        contenu:"",
        tabs : "new_reply",
        id_forum: 0
    }

    userInfo = JSON.parse(localStorage.getItem("current_user"))

    constructor(props){
        super(props)
    }
    
    async componentDidMount(){
        this.setState({id_forum : this.props.id})

        const categoriesResponse = await ApiService.get("/forum/categories/")
        if(categoriesResponse){
            this.setState({categories: categoriesResponse.data.data})
        }
        
        const forumsResponse = await ApiService.get("/forums/?id="+this.state.id_forum)
        if(forumsResponse){
            this.setState({forums: forumsResponse.data.data[0]})
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

    changeTab(tab){
        this.setState({tabs : tab})
    }
    render(){
        return (
            <div>
                <div className='forum-body'>
                    <Helmet>
                        <title>TOGETHER | Forums</title>
                    </Helmet>
                    
                    <div className='w-full bg-color-primary-2 mt-10 py-2'>
                        <div className='w-[99%] px-[10%]'>
                            <div className='w-full flex items-center bg-[#f1f4f8] py-4 px-2 rounded-2xl text-[#71727c] uppercase font-semibold'>
                                <div><span className='text-2xl mr-4'>Forums</span></div>
                                <div><img className='h-8 w-10 mr-4' src={threeArrow} /></div>
                                <div><span className='mr-6 text-2xl'>/</span></div>
                                <div style={{ backgroundColor: this.state.forums.color }} className='h-4 w-4'></div>
                                <div className='ml-2 text-2xl'>
                                    <span>{this.state.forums.libelle_categorie}</span>
                                </div>
                            </div>
                            
                            <div className='mt-4 pb-16'>
                                <div className="grid grid-cols-2 grid-rows-3 border-text-color-principal">
                                    <div className="">
                                        <div className='font-semibold flex'>
                                            <div className='mr-2'>
                                                <img src={this.state.forums.imageUrl} alt="" className="profile-picture" />
                                            </div>
                                            <div>
                                                <div>
                                                    <span>{this.state.forums.name} ({this.state.forums.pays}) - {this.state.forums.filiere}</span>
                                                </div>
                                                <div className='text-[#a398a3]'>
                                                    <span>{this.state.forums.createdAt}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="flex text-right items-end justify-end">
                                        <div></div>
                                    </div>
                                    <div className="">
                                        <div className='uppercase text-xl font-semibold flex items-center'>
                                            <div style={{ backgroundColor: this.state.forums.color }} className='h-4 w-4'></div>
                                            <div className='ml-2'>
                                                <span>{this.state.forums.libelle_categorie}</span>
                                            </div>
                                        </div>
                                        <div className='font-extrabold text-xl cursor-pointer'><span>{this.state.forums.titre}</span></div>
                                    </div>
                                    <div className="flex text-right items-end justify-end">
                                        <div></div>
                                    </div>
                                    <div className='flex'>
                                        <div className='flex items-center w-full'>
                                            <img className='h-10 w-10 mr-4 cursor-pointer' src={lightHeart} /> 
                                            <span className='text-xl'> {this.state.id_forum}  J'aime</span>
                                        </div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div className='w-full flex justify-end items-end text-right'>
                                        <div className='text-right w-full flex justify-end items-end '>
                                            <div><img title='Partager sur Twitter' className='h-6 w-6 mr-3 cursor-pointer' src={twitterImg} />&nbsp;</div>
                                            <div><img title='Partager sur LinkedIn' className='h-6 w-6 mr-3 cursor-pointer' src={linkedInImg} />&nbsp;</div>
                                            <div><img title='Reporter' className='h-6 w-6 mr-3 cursor-pointer' src={flagImg} />&nbsp;</div>
                                            <div><img title='Abonner' className='h-6 w-6 cursor-pointer' src={notificationImg} />&nbsp;</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='border-y-4 py-4 w-full border-text-color-principal'>
                                    <p>{this.state.forums.contenu}</p>
                                </div>
                                <div className='mt-4 w-full flex justify-end items-center'>
                                    <div>
                                        <label className='text-xl'>Trier par</label>
                                    </div>
                                    <div className='ml-4'>
                                        <select className='text-xl py-2 px-3 rounded-3xl bg-[#f0f0f0] text-[#9c97a0]'>
                                            <option value="ASC">Plus ancien</option>
                                            <option value="DESC">Plus récent</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}

export default ForumContentBody