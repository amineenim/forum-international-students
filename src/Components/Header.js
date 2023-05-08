

import React from "react";
import together from '../assets/together.webp';
import '../Styles/Header.css';
import AccountMenu from "./AccountMenu";
import { NavLink } from "react-router-dom";

function Header(){
    const currentUrl = window.location.pathname;
    console.log(currentUrl);
    return (
        <div className="fixed top-0 bg-[#ededed] p-4">
            <div className="flex items-center justify-end">
                <div className="mon-compte"><AccountMenu/></div>
            </div>
            <div className="flex w-full">
                <div className="flex items-end justify-start w-[20%]">
                    <img className="h-[100%] w-[25%] rounded-full" src={together} alt="together" />
                    <h2 className="text-[#31241e] text-2xl font-serif font-bold ">
                        <NavLink to='/' className={`${currentUrl === '/' ? 'color-seventh' : 'text-black'} underline color-primary-1-hover`}>TOGETHER</NavLink>
                    </h2>
                </div>
                <div className="ml-[2%]">
                    <div className="w-8 h-6 "></div>
                    <div className="uppercase font-serif underline pl-5 font-bold text-2xl color-primary-1-hover">
                        <span>
                            <NavLink to='/forum' className={`${currentUrl === '/forum' ? 'color-seventh' : 'text-black'} underline color-primary-1-hover`}>Forums</NavLink>
                        </span>
                    </div>
                </div>
                <div className="ml-[2%]">
                    <div className="div-notif w-8 h-6 bg-[#f04f3f] rounded-xl flex items-center justify-center text-center text-white font-semibold p-2 font-serif">
                        <span>4</span>
                    </div>
                    <div className="uppercase font-serif underline pl-5  font-bold text-2xl color-primary-1-hover">
                        <span>
                            <NavLink to='/messages' className={`${currentUrl === '/messages' ? 'color-seventh' : 'text-black'} underline color-primary-1-hover`}>Messagerie</NavLink>
                        </span>
                    </div>
                </div>
                <div className="ml-[2%]">
                    <div className="div-notif w-8 h-6 bg-[#f04f3f] rounded-xl flex items-center justify-center text-center text-white font-semibold p-2 font-serif">
                        <span>2</span>
                    </div>
                    <div className="uppercase font-serif underline pl-5 font-bold text-2xl color-primary-1-hover">
                        <span>
                            <NavLink to='/relation' className={`${currentUrl === '/relation' ? 'color-seventh' : 'text-black'} underline color-primary-1-hover`}>Relations</NavLink>
                        </span>
                    </div>
                </div>
                <div className="ml-[2%]">
                    <div className="w-8 h-6"></div>
                    <div className="uppercase font-serif pl-5 font-bold text-2xl">
                        <span>
                            <NavLink to='/contact' className={`${currentUrl === '/contact' ? 'color-seventh' : 'text-black'} underline color-primary-1-hover`}>Contact</NavLink>
                        </span>
                    </div>
                </div>
                <div className="ml-[2%]">
                    <div className="w-8 h-6"></div>
                    <div className="uppercase font-serif underline pl-5 font-bold text-2xl color-primary-1-hover">
                        <span>
                            <NavLink to='/about' className={`${currentUrl === '/about' ? 'color-seventh' : 'text-black'} underline color-primary-1-hover`}>A propos</NavLink>
                        </span>
                    </div>
                </div>
                <div className="ml-[2%]">
                    <div className="w-8 h-6"></div>
                    <div className="uppercase font-serif pl-5 font-bold text-2xl color-primary-1-hover">
                        <span>
                            <NavLink to='/admin' className={`${currentUrl === '/admin' ? 'color-seventh' : 'text-black'} underline color-primary-1-hover`}>Admin</NavLink>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        // <div className="header">
        //     <div className="logo">
        //         <img src={together} alt="together" />
        //         <h2>
        //             <NavLink to='/'>TOGETHER</NavLink>
        //         </h2>
        //     </div>
        //     <div className="navigation-links">
        //         <ul className="links">
        //             <li>
        //                 <NavLink to='/'>
        //                     Accueil
        //                 </NavLink>
        //             </li>
        //             <li>
        //                 <NavLink to='/forum'>
        //                     Forums
        //                 </NavLink>
        //             </li>
        //             <li>
        //                 <NavLink to='/contact'>
        //                     Contact
        //                 </NavLink>
        //             </li>
        //             <li>
        //                 <NavLink to='/about'>
        //                     A propos
        //                 </NavLink>
        //             </li>
        //             <li>
        //                 <div className="mon-compte">
        //                 <AccountMenu/>
        //                 </div>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
    )
}

export default Header;