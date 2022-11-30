import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginSignup/Login';
import AboutUs from './pages/AboutUs/About-Us';
import Signup from './pages/LoginSignup/Signup';
import NewDebate from './pages/NewDebate/NewDebate';
import NewDebateWrapper from './pages/NewDebate/NewDebateWrapper';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Debates from './pages/Debates/Debates';
import InDebateTimer from './pages/InDebateTimer/InDebateTimer';
import Profile from './pages/Profile/Profile';
import Error from './pages/Error404/Error'
import EditProfile from './pages/EditProfile/EditProfile';

import './App.css';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/log-In' exact element={<Login />} />
          <Route path='/sign-up' exact element={<Signup/>} />
          <Route path='/about-us' exact element={<AboutUs />} />
          <Route path='/new-debate' exact element={<NewDebateWrapper />} />
          <Route path='/debates' exact element={<Debates />} />
          <Route path='/in-debate' exact element={<InDebateTimer />} />
          <Route path='/profile' exact element={<Profile />} />
          <Route path='/edit-profile' exact element={<EditProfile />} />

          <Route path='*' exact element={<Error />} />
        </Routes>
      <Footer />
      </Router>
    </>
  )
}

export default App
