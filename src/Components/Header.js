

import React from "react";
import together from '../assets/together.webp';
import '../Styles/Header.css';
import AccountMenu from "./AccountMenu";
import { NavLink } from "react-router-dom";

function Header(){
    return (
        <div className="fixed top-0 bg-white p-4">
            <div className="flex items-center justify-end">
                <div className="mon-compte"><AccountMenu/></div>
            </div>
            <div className="flex w-full">
                <div className="flex items-end justify-start w-[20%]">
                    <img className="h-[100%] w-[25%] rounded-full" src={together} alt="together" />
                    <h2 className="text-[#31241e] text-2xl font-serif font-bold underline">
                        <NavLink to='/'>TOGETHER</NavLink>
                    </h2>
                </div>
                <div className="ml-[2%]">
                    <div className="div-notif w-8 h-6 bg-[#f04f3f] rounded-xl flex items-center justify-center text-center text-white font-semibold p-2 font-serif">
                        <span>1</span>
                    </div>
                    <div className="uppercase font-serif underline pl-5 text-black font-bold text-2xl">
                        <span>
                            <NavLink to='/forum'>Forums</NavLink>
                        </span>
                    </div>
                </div>
                <div className="ml-[2%]">
                    <div className="div-notif w-8 h-6 bg-[#f04f3f] rounded-xl flex items-center justify-center text-center text-white font-semibold p-2 font-serif">
                        <span>4</span>
                    </div>
                    <div className="uppercase font-serif underline pl-5 text-black font-bold text-2xl">
                        <span>
                            <NavLink to='/messages'>Messagerie</NavLink>
                        </span>
                    </div>
                </div>
                <div className="ml-[2%]">
                    <div className="div-notif w-8 h-6 bg-[#f04f3f] rounded-xl flex items-center justify-center text-center text-white font-semibold p-2 font-serif">
                        <span>2</span>
                    </div>
                    <div className="uppercase font-serif underline pl-5 text-black font-bold text-2xl">
                        <span>
                            <NavLink to='/relation'>Relations</NavLink>
                        </span>
                    </div>
                </div>
                <div className="ml-[2%]">
                    <div className="w-8 h-6"></div>
                    <div className="uppercase font-serif underline pl-5 text-black font-bold text-2xl">
                        <span>
                            <NavLink to='/contact'>Contact</NavLink>
                        </span>
                    </div>
                </div>
                <div className="ml-[2%]">
                    <div className="w-8 h-6"></div>
                    <div className="uppercase font-serif underline pl-5 text-black font-bold text-2xl">
                        <span>
                            <NavLink to='/about'>A propos</NavLink>
                        </span>
                    </div>
                </div>
                <div className="ml-[2%]">
                    <div className="w-8 h-6"></div>
                    <div className="uppercase font-serif underline pl-5 text-black font-bold text-2xl">
                        <span>
                            <NavLink to='/admin'>Admin</NavLink>
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