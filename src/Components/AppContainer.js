import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Registration from '../pages/Registration';
import Temoignage from '../pages/Temoignage';
import UserProfile from '../pages/UserProfile';
import Post from '../pages/Post';
import About from '../pages/About'
import Login from '../pages/Login';
import Home from '../pages/Home';
import Messagerie from '../pages/Messagerie';
import Contact from '../pages/Contact';
import Password from '../pages/Password';
import { Helmet } from 'react-helmet';
import ForumHome from "../pages/ForumHome";
import ForumContent from "../pages/ForumContent";
import NotFound from '../pages/NotFound';

function AppContainer() {
  return (
    <Router>
      <Helmet>
        <title>TOGETHER</title>
      </Helmet>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/myprofile' element={<UserProfile />} />
        <Route path='/temoignages' element={<Temoignage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/post' element={<Post />} />
        <Route path='/messages' element={<Messagerie />} />
        <Route path='/changePassword' element={<Password />} />
        <Route path='/forum' element={<ForumHome />} />
        <Route path='/forum/:id' element={<ForumContent />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppContainer