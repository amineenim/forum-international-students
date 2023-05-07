import React from 'react'
import Header from '../Components/Header'
import PostBody from '../Components/PostBody'
import Footer from '../Components/Footer'

function Post() {
  return (
    <div>
        <div className='mb-[9%]'>
          <Header/>
        </div>
        <PostBody/>
        <Footer/>
    </div>
  )
}

export default Post