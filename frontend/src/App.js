import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginSignup/Login';
import Signup from './pages/LoginSignup/Signup';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/log-In' exact element={<Login />} />
          <Route path='/sign-up' exact element={<Signup/>} />
        </Routes>
      <Footer />
      </Router>
    </>
  )
}

export default App