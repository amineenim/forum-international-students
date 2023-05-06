

import React, { useEffect, useState } from 'react'
import '../Styles/Comments.css'
import { ApiService } from '../Services/ApiService'
import { AiOutlineDelete } from 'react-icons/ai'
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx'

function Comments() {
    // state that stores the first index of the comments displayed 
    const [initialIndex, setInitialIndex] = useState(0)
    const limit_comments = 5
    const [currentListing, setCurrentListing] = useState(1)
    // make an Apicall to bring comments data 
    const [comments, setComments] = useState([])
    useEffect(() => {
        const makeApiCall = async() => {
            try {
                const response = await ApiService.get('/forum/comments/')
                if(response.status === 200 && response.statusText === "OK")
                {
                    console.log(response.data)
                    setComments(response.data.data)
                }
            } catch (error) {
                console.log(error.response)
            }
        }
        makeApiCall()
    },[])
    // function that verifies if a number lies within a given range
    const isBetween = (x, min, max) => {
        return x >= min && x <= max
    }
  return (
    <>
        <div className='list-comments'>
            <table>
                <thead>
                    <tr>
                        <th>AUTEUR</th>
                        <th>DATE DE PUBLICATION</th>
                        <th>CONTENU</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        comments.length > 0 && 
                        (
                            comments.map(
                                (comment,index) => {
                                    if(index < initialIndex + limit_comments)
                                    {
                                        if(initialIndex == 0){
                                            return (
                                                <tr key={comment.id}>
                                                    <td>{comment.name}</td>
                                                    <td>{comment.createdAt}</td>
                                                    <td>
                                                        {comment.contenu.length > 40 ? comment.contenu.slice(0, 39) + '...' : comment.contenu}
                                                    </td>
                                                    <td>
                                                        <div className='delete-comment'>
                                                            <AiOutlineDelete size={26} color='red' />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        else{
                                            if(isBetween(index, initialIndex, initialIndex + limit_comments))
                                            {
                                                return (
                                                    <tr key={comment.id}>
                                                        <td>{comment.name}</td>
                                                        <td>{comment.createdAt}</td>
                                                        <td>
                                                            {comment.contenu.length > 40 ? comment.contenu.slice(0, 39) + '...' : comment.contenu}
                                                        </td>
                                                        <td>
                                                            <div className='delete-comment'>
                                                                <AiOutlineDelete size={26} color='red' />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        }
                                    }
                                }
                            )
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
                    setInitialIndex(initialIndex - limit_comments)
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
                        if(initialIndex + limit_comments < comments.length )
                        {
                            setInitialIndex(initialIndex + limit_comments)
                            setCurrentListing(currentListing + 1)
                        }
                    }}
                />
            </span>
        </div>
    </>
  )
}

export default Comments