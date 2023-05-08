import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import '../Styles/Main.css';
import amisImg from '../assets/friends.png';
import invitImg from '../assets/invit.png';
import newFriendImg from '../assets/user.png';
import checkImg from '../assets/check-mark.png';
import refusImg from '../assets/close.png';


export default function RelationBody() {
    const relationships = [1,2,3, 4, 5, 6]
    const userInfo = JSON.parse(localStorage.getItem('current_user'));
    return (<div>
        <Helmet>
            <title>TOGETHER | Relation</title>
        </Helmet>
        <div className='py-[3%] px-[10%] container-bg h-full w-full'>
                <div className='grid grid-cols-5 grid-rows-1 h-full'>
                    <div className='col-span-2 h-[500px] border-2 border-solid border-[#939393] px-8 py-4 bg-[#ececec] rounded-lg'>
                        <div className='grid grid-cols-1 h-[60%] grid-rows-4 gap-6'>
                            <div className='text-[#0d53b0] text-3xl font-bold font-serif'>
                                <span>Relation</span>
                            </div>
                            <div>
                                <button>
                                    <div className='flex items-center'>
                                        <img className='h-10 w-10 mr-6' src={invitImg} alt=""/>
                                        <span className='underline text-xl font-bold uppercase'>Vos invitations</span>
                                    </div> 
                                </button>
                            </div>
                            <div>
                                <button>
                                    <div className='flex items-center'>
                                        <img className='h-10 w-10 mr-6' src={amisImg} alt=""/>
                                        <span className='underline text-xl font-bold uppercase'>Vos relations</span>
                                    </div> 
                                </button>
                            </div>
                            <div>
                                <button>
                                    <div className='flex items-center'>
                                        <img className='h-10 w-10 mr-6' src={newFriendImg} alt=""/>
                                        <span className='underline text-xl font-bold uppercase'>Ajouter une nouvelle relation</span>
                                    </div> 
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className='col-span-3 ml-6 pr-8 py-4'>
                        <div className='mb-6 text-3xl font-bold font-serif'>
                            <span>Invitations</span>
                        </div>
                        { 
                            relationships.map((option, index) => (
                                <div key={index} className='grid grid-cols-4 gap-4 mb-6'>
                                    <div className='flex items-center justify-start col-span-2'>
                                        <div className='mr-2'>
                                            <img src={userInfo.imageUrl} alt="" className="profile-picture" />
                                        </div>
                                        <div>
                                            <span>{userInfo.name}</span>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <button className='bg-[#0097b2] text-white w-40 px-6 py-2 font-serif rounded-xl'>
                                            <div className='flex items-center'>
                                                <img className='h-4 w-4 mr-2' src={checkImg} alt=""/>
                                                <span className=''>Confirmer</span>
                                            </div> 
                                        </button>
                                    </div>
                                    <div>
                                        <button className='bg-[#a6a6a6] text-white w-40 px-6 py-2 font-serif rounded-xl'>
                                            <div className='flex items-center'>
                                                <img className='h-4 w-4 mr-2' src={refusImg} alt=""/>
                                                <span className=''>Refuser</span>
                                            </div> 
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
    </div>)
}