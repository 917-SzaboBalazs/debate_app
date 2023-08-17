import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/LoginSignup/Login';
import AboutUs from './pages/AboutUs/About-Us';
import Signup from './pages/LoginSignup/Signup';
import NewDebateWrapper from './pages/NewDebate/NewDebateWrapper';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Debates from './pages/Debates/Debates';
import InDebateTimer from './pages/InDebateTimer/InDebateTimer';
import Results from './pages/Results/Results';
import FinishedDebate from './pages/FinishedDebate/FinishedDebate';
import Profile from './pages/Profile/Profile';
import Error from './pages/Error404/Error'
import EditProfile from './pages/EditProfile/EditProfile';
import JudgesDrag from './pages/JudgesDrag/JudgesDrag';

import TesterPage from './pages/TesterPage/Test';

import './App.css';
import axiosInstance from './axios';
import Blog from './pages/Blog/Blog';
import BlogDetails from './pages/Blog/BlogDetails/BlogDetails';


function App() {
  /* USER */
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ username, setUsername ] = useState('');
  
  /* DEBATE */
  const [ inDebate, setInDebate ] = useState(false);
  const [ status, setStatus ] = useState('');

  const [userLoading, setUserLoading] = useState(true);
  const [debateLoading, setDebateLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("user/current/")
      .then((res) => {
        setLoggedIn(true);
        setUsername(res.data.username);
        setUserLoading(false);
      })
      .catch((err) => {
        setUserLoading(false);
      });

    axiosInstance
      .get("debate/current/")
      .then((res) => {
        setInDebate(true);

        if (res.data.status == 'lobby') {
          setStatus('/new-debate')
        } else if (res.data.status == 'running') {
          setStatus('/in-debate')
        } else if (res.data.status == 'finished') {
          setStatus('/finished-debate')
        }

        setDebateLoading(false);
      })
      .catch((err) => {
        setDebateLoading(false);
      });

  }, []);

  if (debateLoading || userLoading) {
    return <></>
  }

  return (
    <>
      <Router>
        {/* Navbar  */}
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} inDebate={inDebate} setInDebate={setInDebate} status={status} setStatus={setStatus} username={username} setUsername={setUsername}/>

        {/* A tobbi oldal elerhetosege  */}
        <Routes>
          {/* Home  */}
          <Route path='/' exact element={<Home loggedIn={loggedIn} inDebate={inDebate} setInDebate={setInDebate} status={status} setStatus={setStatus} />} />

          {/* Login - Signup  */}
          <Route path='/log-In' exact element={<Login setLoggedIn={setLoggedIn} setGlobalUsername={setUsername} />} />
          <Route path='/sign-up' exact element={<Signup/>} />

          <Route path='/about-us' exact element={<AboutUs />} />
          <Route path='/debates' exact element={<Debates />} />

          {/* DEBATE */}
          {/* Ezt a kettot majd egybe fog kelleni cuccoljam */}
          <Route path='/new-debate' exact element={<NewDebateWrapper />} />
          <Route path='/in-debate' exact element={<InDebateTimer />} />
          <Route path='/judges-drag' exact element={<JudgesDrag inDebate={inDebate} />} />
          {/*<Route path='/results' exact element={<Results />} />*/}
          <Route path='/finished-debate' exact element={<FinishedDebate setInDebate={setInDebate} setStatus={setStatus}/>} />

          {/* Profile */}
          <Route path='/profile' exact element={<Profile loggedIn={loggedIn} />} />
          <Route path='/edit-profile' exact element={<EditProfile loggedIn={loggedIn} />} />

          {/* Blog */}
          <Route path='/blog' exact element={<Blog />} />
          <Route path='/blog/:slug' exact element={<BlogDetails />} />

          {/* Baj van, ha ide kerul valaki  */}
          <Route path='*' exact element={<Error />} />
        </Routes>
      
      {/* Footer  */}
      <Footer />
      </Router>
    </>
  )
}

export default App
