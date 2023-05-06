import React, { useEffect, useState } from 'react'
import '../Styles/Publications.css'
import { AiOutlineDelete } from 'react-icons/ai'
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx'
import { ApiService } from '../Services/ApiService'


function Publications() {
    const [initialIndex, setInitialIndex] = useState(0)
    const limit_posts = 4
    const [currentListing, setCurrentListing] = useState(1)
    const [posts, setPosts] = useState([])
    // function that verifies if a number lies within a given range
    const isBetween = (x, min, max) => {
        return x >= min && x <= max
    }
    // function that brings the posts 
    useEffect(() => {
        const makeApiCall = async() => {
            try {
                const response = await ApiService.get('/forums/')
                if(response.status === 200 && response.statusText === "OK")
                {
                    setPosts(response.data.data)
                }
            } catch (error) {
                console.log(error.response)
            }
        }
        makeApiCall()
    },[])
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
                    posts.map(
                        (publication, index) => {
                            if(index < initialIndex + limit_posts)
                            {
                                if(initialIndex == 0)
                                {
                                    return (
                                        <tr key={index}>
                                            <td>{publication.name}</td>
                                            <td>{publication.comment_max_date}</td>
                                            <td>{publication.libelle_categorie}</td>
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
                                                <td>{publication.name}</td>
                                                <td>{publication.comment_max_date}</td>
                                                <td>{publication.libelle_categorie}</td>
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
                if(initialIndex + limit_posts < posts.length )
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