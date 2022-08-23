import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

import CreateDebate from './Popups/CreateDebate/CreateDebate';
import JoinDebate from './Popups/JoinDebate/JoinDebate';
import LogOut from '../../logout';

import axiosInstance from '../../axios';

import './Navbar.css';
import './Navbar2.css';
import axios from 'axios';

function CollapsibleExample() {
    let navigate = useNavigate();

    const [ triggerCreate, setTriggerCreate ] = useState(false);
    const [ triggerJoin, setTriggerJoin ] = useState(false);
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userName, setUserName ] = useState('');

    // check if user is logged in
    useEffect(() => {
      const accessToken = localStorage.getItem('access_token');
      // console.log(accessToken);
      // if (accessToken === null) {
      //     // setLoggedIn(true);
      //     console.log('not logged in bruh')
      // } else {
      //   setLoggedIn(true);
      //   setUserName('Jani');
      //   console.log('logged in');
      // }

      axiosInstance
        .get('user/current/')
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

    }, []);

    const handleClickTriggerCreate = () => {
        setTriggerCreate(true);
        console.log(triggerCreate);
    }

    const handleClickTriggerJoin = () => {
      setTriggerJoin(true);
    }

    const logOut = () => {
      LogOut();
      setLoggedIn(false);
      window.location.reload(false);
    }

  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="primary" className='nav'>
      <Container>
        <Navbar.Brand href="/" className='nav-brand'>React <span className='nav--span'>Bootstrap</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" color='white'/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/debates" className='nav-link'>Debates</Nav.Link>
            <Nav.Link onClick={handleClickTriggerJoin} className='nav-link'>Join a Debate</Nav.Link>
            <Nav.Link onClick={handleClickTriggerCreate} className='nav-link'>Create a Debate</Nav.Link>
            <Nav.Link href="/about-us" className='nav-link'>About Us</Nav.Link>
            <Nav.Link href="/in-debate" className='nav-link'>Deb.Timer-PROBA</Nav.Link>
          </Nav>
          <Nav>
            { !loggedIn ?
                <>
                <Nav.Link href="/log-In">Sign In</Nav.Link>
                <Nav.Link href="/sign-up">Register</Nav.Link>
                </>
                :
                <>
                <Nav.Link >Szervusz {userName} </Nav.Link>
                <Nav.Link href="../../logout">Log Out</Nav.Link>
                </>
            }
            {/* <Nav.Link href="/log-In">Login</Nav.Link> */}
            {/* <Nav.Link href="/sign-up">Signup</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <CreateDebate loggedIn={loggedIn} trigger={triggerCreate} setTrigger={setTriggerCreate} />
    <JoinDebate loggedIn={loggedIn} trigger={triggerJoin} setTrigger={setTriggerJoin} />
    </>
  );
}

export default CollapsibleExample;
