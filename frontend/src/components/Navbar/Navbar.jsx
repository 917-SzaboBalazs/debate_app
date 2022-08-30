import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import CreateDebate from '../Popups/CreateDebate/CreateDebate';
import JoinDebate from '../Popups/JoinDebate/JoinDebate';

import axiosInstance from '../../axios';

import './Navbar.css';
import './Navbar2.css';


function CollapsibleExample() {
    let navigate = useNavigate();

    const [ triggerCreate, setTriggerCreate ] = useState(false);
    const [ triggerJoin, setTriggerJoin ] = useState(false);
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userName, setUserName ] = useState('');
    const [ inDebate, setInDebate ] = useState(false);

    // check if user is logged in
    useEffect(() => {

      axiosInstance
        .get('user/current/')
        .then((res) => {
          console.log(res);
          setUserName(res.data.username);
          setLoggedIn(true);
          console.log(userName);

          if (res.data.current_debate != null) {
            setInDebate(true);
          } else {
            setInDebate(false);
          }

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
      axiosInstance
        .post('user/logout/blacklist/', {
  			refresh_token: localStorage.getItem('refresh_token'),
  		})
        .then((res) => {
          localStorage.removeItem('access_token');
      		localStorage.removeItem('refresh_token');
      		axiosInstance.defaults.headers['Authorization'] = null;

          setLoggedIn(false);

          navigate('/');
          window.location.reload(false);
      })
        .catch((err) => {
          console.log(err);
        })
    }

    const leaveDebate = () => {
      axiosInstance
        .patch('user/current/', {"current_debate": null, 'role': null})
        .then((res) => {
          console.log('Sikeres kilépés');
          navigate('/');
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
          console.log('Baj van');
        })
    }

  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="primary" className='nav'>
      <Container>
        <Navbar.Brand href="/" className='nav-brand'>Debate <span className='nav--span'>Culture</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" color='white'/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about-us" className='nav-link'>About Us</Nav.Link>
            <Nav.Link href="/debates" className='nav-link'>Debates</Nav.Link>
            {
              !inDebate ?
              <>
                <Nav.Link onClick={handleClickTriggerCreate} className='nav-link yellow-text'>Create a Debate</Nav.Link>
                <Nav.Link onClick={handleClickTriggerJoin} className='nav-link yellow-text'>Join a Debate</Nav.Link>
              </>
              :
              <>
                <Nav.Link href="/new-debate" className='yellow-text'>Current Debate</Nav.Link>
                <Nav.Link onClick={leaveDebate} className='yellow-text'>Leave Debate</Nav.Link>
              </>
            }
            <Nav.Link href="/in-debate" className='nav-link'>Timer Page</Nav.Link>
          </Nav>
          <Nav>
            { !loggedIn ?
                <>
                  <Nav.Link href="/log-In">Log In</Nav.Link>
                  <Nav.Link href="/sign-up">Register</Nav.Link>
                </>
                :
                <>
                  <Nav.Link href='/profile'>{userName} </Nav.Link>
                  <Nav.Link onClick={logOut}>Log Out</Nav.Link>
                </>
            }
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
