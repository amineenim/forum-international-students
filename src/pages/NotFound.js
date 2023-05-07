
import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import NotFoundBody from '../Components/NotFoundBody'
import '../Styles/NotFound.css'

function NotFound(){
    return (
        <div className="not-found-page">
            <div className='mb-[9%]'>
            <Header/>
            </div>
            <NotFoundBody />
            <Footer />
        </div>
    )
}

export default NotFound