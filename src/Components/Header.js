

import React from "react";
import together from '../assets/together.webp';
import '../Styles/Header.css';
import AccountMenu from "./AccountMenu";
import { NavLink } from "react-router-dom";

function Header(){
    return (
        <div className="header">
            <div className="logo">
                <img src={together} alt="together" />
                <h2>TOGETHER</h2>
            </div>
            <div className="navigation-links">
                <ul className="links">
                    <li>
                        <NavLink to='/forum'>
                            Forums
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact'>
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/about'>
                            A propos
                        </NavLink>
                    </li>
                    <li>
                        <div className="mon-compte">
                        <AccountMenu/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;