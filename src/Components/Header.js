

import React from "react";
import together from '../assets/together.webp';
import '../Styles/Header.css';
import AccountMenu from "./AccountMenu";

function Header(){
    return (
        <div className="header">
            <div className="logo">
                <img src={together} alt="together" />
                <h2>TOGETHER</h2>
            </div>
            <div className="navigation-links">
                <ul className="links">
                    <li>Forums</li>
                    <li>Contact</li>
                    <li>A propos</li>
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