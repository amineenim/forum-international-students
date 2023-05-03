
import React, { useState } from 'react';
import '../Styles/Forum.css';

import {FaArrowLeft,FaArrowRight} from 'react-icons/fa'
import { Link, useNavigate, NavLink } from 'react-router-dom';
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
        comments: [],
        forums: [],
        isNewComment: false,
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

        const commentsResponse = await ApiService.get(`/forum/comments/?id_forum=${this.props.id}`)
        if(commentsResponse){
            this.setState({comments: commentsResponse.data.data})
        }
        
        const forumsResponse = await ApiService.get("/forums/?id="+this.state.id_forum)
        if(forumsResponse){
            this.setState({forums: forumsResponse.data.data[0]})
        }
    }
    
    componentWillUnmount(){
        
    }

    activeAddNewComment(){
        this.setState({isNewComment : true})
    }

    commenter(){
        const contenu = document.getElementById("contenu")
        const id_user = this.userInfo.id
        const id_forum = this.state.id_forum
        const data = {
            "id_forum": id_forum,
            "id_user": id_user,
            "contenu": contenu.value
        }

        ApiService.post("/forums/comments", data)
        .then( response => {
            this.setState({isNewComment : false})
            contenu.value = ""
        })
    }

    retour(){
        this.setState({isNewComment : false})
        document.getElementById("categorie").value = ""
        document.getElementById("contenu").value = ""
        document.getElementById("titre").value = ""
    }

    render(){
        return (
            <div className='forum-body'>
                <Helmet>
                    <title>TOGETHER | Forums</title>
                </Helmet>
                
                <div className='w-full bg-color-primary-2 mt-10 py-2'>
                    <div className='w-[99%] px-[10%]'>
                        <div className='w-full flex items-center bg-[#f1f4f8] py-4 px-2 rounded-2xl text-[#71727c] uppercase font-semibold'>
                            <div><NavLink to='/forum'><span className='text-2xl mr-4'>Forums</span></NavLink></div>
                            <div><img className='h-8 w-10 mr-4' src={threeArrow} /></div>
                            <div><span className='mr-6 text-2xl'>/</span></div>
                            <div style={{ backgroundColor: this.state.forums.color }} className='h-4 w-4'></div>
                            <div className='ml-2 text-2xl'>
                                <span>{this.state.forums.libelle_categorie}</span>
                            </div>
                        </div>
                        
                        <div className='mt-4 pb-6'>
                            <div className="grid grid-cols-2 grid-rows-3 border-text-color-principal">
                                <div className="col-span-2">
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
                                {/* <div className="flex text-right items-end justify-end">
                                    <div></div>
                                </div> */}
                                <div className="col-span-2 mb-[1%]">
                                    <div className='uppercase text-xl font-semibold flex items-center'>
                                        <div style={{ backgroundColor: this.state.forums.color }} className='h-4 w-4'></div>
                                        <div className='ml-2'>
                                            <span>{this.state.forums.libelle_categorie}</span>
                                        </div>
                                    </div>
                                    <div className='font-extrabold text-xl cursor-pointer'><span>{this.state.forums.titre}</span></div>
                                </div>
                                {/* <div className="flex text-right items-end justify-end">
                                    <div></div>
                                </div> */}
                                <div className='flex'>
                                    <div className='flex items-center justify-start w-full'>
                                        <img className='h-10 w-10 mr-4 cursor-pointer' src={lightHeart} /> 
                                        <span className='text-xl'> {this.state.id_forum}  J'aime</span>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='flex items-center justify-end w-full'>
                                        <img title='Partager sur Twitter' className='h-6 w-6 mr-3 cursor-pointer' src={twitterImg} />&nbsp;
                                        <img title='Partager sur LinkedIn' className='h-6 w-6 mr-3 cursor-pointer' src={linkedInImg} />&nbsp;
                                        <img title='Reporter' className='h-6 w-6 mr-3 cursor-pointer' src={flagImg} />&nbsp;
                                        <img title='Abonner' className='h-6 w-6 cursor-pointer' src={notificationImg} />&nbsp;
                                    </div>
                                </div>
                            </div>
                            <div className='border-y-4 py-4 w-full border-text-color-principal text-justify'>
                                <p>{this.state.forums.contenu}</p>
                            </div>
                            <div className='mt-4 w-full flex justify-end items-center'>
                                <div>
                                    <label className='text-xl'>Trier par</label>
                                </div>
                                <div className='ml-4'>
                                    <select className='text-xl py-2 px-3 rounded-3xl bg-[#f0f0f0] text-[#9c97a0] cursor-pointer'>
                                        <option value="ASC">Plus ancien</option>
                                        <option value="DESC">Plus récent</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div id='all-comments'>
                        { 
                            this.state.comments.map((option, index) => (
                                <div className="mb-4 border-text-color-principal pb-[1%]">
                                    <div className='font-semibold flex'>
                                        <div className='mr-2'>
                                            <img src={option.imageUrl} alt="" className="profile-picture" />
                                        </div>
                                        <div>
                                            <div>
                                                <span>{option.name} ({option.pays}) - {option.filiere}</span>
                                            </div>
                                            <div className='text-[#a398a3]'>
                                                <span>{option.createdAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='pl-[4%] pt-[1%] text-justify'>
                                        <p>{option.contenu}</p>
                                    </div>
                                    <div className="flex text-right items-center justify-end mt-4 pr-[3%]">
                                        <div className='flex'>
                                            <img className='h-6 w-6 mr-2 cursor-pointer' src={lightHeart} /> 
                                            <span className=''> {(option.id) + (Math.floor(Math.random() * (15 - 3 + 1) + 3))}  J'aime</span>
                                        </div>
                                        <div><img title='Reporter' className='h-4 w-4 cursor-pointer ml-2' src={flagImg} /></div>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                        <div className='justify-center items-center text-center mb-4'>
                            <button onClick={() => this.activeAddNewComment()} className='uppercase bg-color-primary-1 bg-color-primary-2-hover color-primary-2 color-secondary-hover border-color-secondary-hover border-2 border-color-primary-1 px-2 py2 rounded-3xl h-10 font-semibold w-48'>
                                <span>Commenter</span>
                            </button>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default ForumContentBody