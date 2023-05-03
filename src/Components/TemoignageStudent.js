

import React, { startTransition } from 'react';
import {FaStar} from 'react-icons/fa';

function TemoignageStudent(props) {
    const initialStyle = {color : "white"}
    const finalStyle = {color : "brown"}
  return (
    <div className='temoignage-student'>
        <img src={props.image} alt="image-student"/>
        <h4 className='temoignage-owner'>
            {props.owner}
        </h4>
        <p className='testimony'>
            {props.content}
        </p>
        <div className='rating'>
            {
            (() => {
                let stars = []
                for(let i=0; i<5; i++)
                {
                   i < props.rating ? stars.push(<FaStar key={i} style={finalStyle} size="2rem"/>) : stars.push(<FaStar key={i} style={initialStyle} size="2rem"/>)
                }
                return stars 
            })()}
        </div>
    </div>
  )
}

export default TemoignageStudent