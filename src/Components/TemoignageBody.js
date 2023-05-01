

import React, { useState } from 'react'
import '../Styles/TemoignageBody.css'
import TemoignageStudent from './TemoignageStudent'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import { Helmet } from 'react-helmet';
const temoignagesData = [{
    image : require("../assets/profiles/student1.jpg"),
    text : "Le forum est incroyablement utile. J'ai pu poser mes questions sur les études à l'étranger et obtenir des réponses utiles de la part d'autres étudiants. Cela m'a aidé à mieux comprendre les défis que je pourrais rencontrer et à me sentir plus confiant dans ma décision de partir étudier à l'étranger.",
    rating : 4
},{
    image : require("../assets/profiles/student2.png"),
    text :  "le forum est excellent",
    rating : 3
}]

function TemoignageBody() {
    // state that holds the current testimony being displayed
    const [currentTestimony, setCurrentTestimony]= useState(0)
    return (
        <div className='temoignage-container'>
            <Helmet>
                <title>TOGETHER | Temoignages</title>
            </Helmet>
            {temoignagesData.map((temoignage,index) => {
                if(index === currentTestimony){
                    return (
                        <TemoignageStudent 
                        key={index}
                        image = {temoignage.image}
                        content = {temoignage.text}
                        rating = {temoignage.rating}
                        />
                )
                }
            })}
            <div className='skip'>
                <div className='left'>
                    <FaAngleDoubleLeft size="2rem"
                    onClick={(prev) => {prev > 0 ? setCurrentTestimony(prev - 1) : setCurrentTestimony(0)} }
                    />
                </div>
                <div className='right'>
                    <FaAngleDoubleRight size="2rem"
                    onClick={(prev) => {prev < temoignagesData.length-1 ? setCurrentTestimony(prev + 1) : setCurrentTestimony(temoignagesData.length-1)} }
                    />
                </div>
            </div>
        </div>
    )
}

export default TemoignageBody