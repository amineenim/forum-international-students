import React, { useState } from 'react'
import '../Styles/Publications.css'
import { AiOutlineDelete } from 'react-icons/ai'
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx'

const publications = [
    {auteur : 'Tassa Yacine',
    data : '25/03/2023',
    titre : 'test',
    contenu :'lorem ipsum test is jey sae ncncdzs'},
    {auteur : 'Edouard CHEVENS',
    data : '22/03/2023',
    titre : 'lorem',
    contenu :'lorem ipsum test is jey sae ncncdzs hello world hope everything goes well'},
    {auteur : 'Amine MAOURID',
    data : '20/03/2023',
    titre : 'hello',
    contenu :'hello evryone, react is cool'},
    {auteur : 'yassine DALA',
    data : '18/03/2023',
    titre : 'greeting',
    contenu :'lorem ipsum test is jey sae ncncdzs'},
    {auteur : 'Abdelah ABDELLAOUI',
    data : '03/03/2023',
    titre : 'greeting',
    contenu :'hello guys, i mlearning programming language called angular'},
    {auteur : 'ilyass SAADANE',
    data : '02/03/2023',
    titre : 'greeting',
    contenu :'testing the functionnality of pagination it works as expected !'}
]

function Publications() {
    const [initialIndex, setInitialIndex] = useState(0)
    const limit_posts = 4
    const [currentListing, setCurrentListing] = useState(1)
    // function that verifies if a number lies within a given range
    const isBetween = (x, min, max) => {
        return x >= min && x <= max
    }
  return (
    <>
    <div className='list-publications'>
        <table>
            <thead>
                <tr>
                    <th>AUTEUR</th>
                    <th>DATE DE PUBLICATION</th>
                    <th>TITRE</th>
                    <th>CONTENU</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {
                    publications.map(
                        (publication, index) => {
                            if(index < initialIndex + limit_posts)
                            {
                                if(initialIndex == 0)
                                {
                                    return (
                                        <tr key={index}>
                                            <td>{publication.auteur}</td>
                                            <td>{publication.data}</td>
                                            <td>{publication.titre}</td>
                                            <td>{publication.contenu.length >= 40 ? publication.contenu.slice(0, 39) + '...' : publication.contenu}</td>
                                            <td>
                                                <div className='actions'>
                                                    <p><AiOutlineDelete size={26} color='red' /></p>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }else{
                                    if(isBetween(index, initialIndex, initialIndex + limit_posts))
                                    {
                                        return (
                                            <tr key={index}>
                                                <td>{publication.auteur}</td>
                                                <td>{publication.data}</td>
                                                <td>{publication.titre}</td>
                                                <td>{publication.contenu.length >= 40 ? publication.contenu.slice(0, 39) + '...' : publication.contenu}</td>
                                                <td>
                                                    <div className='actions'>
                                                        <p><AiOutlineDelete size={26} color='red' /></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                }
                            }
                        }
                    )
                }
            </tbody>
        </table>
    </div>
    <div className='pagination-nav'>
    <span className='arrow-left'>
        <RxDoubleArrowLeft size={26}
        onClick={() => {
        if(initialIndex > 0 )
        {
            setInitialIndex(initialIndex - limit_posts)
            if(currentListing > 1){
                setCurrentListing(currentListing - 1)
            }
        }
        }}
        />
        </span>
        <span className='actual-page'>
                {currentListing}
        </span>
        <span className='arrow-right'>
            <RxDoubleArrowRight size={26} 
            onClick={() => {
                if(initialIndex + limit_posts < publications.length )
                {
                    setInitialIndex(initialIndex + limit_posts)
                    setCurrentListing(currentListing + 1)
                }
            }}
            />
        </span>
    </div>
    </>
    
  )
}

export default Publications