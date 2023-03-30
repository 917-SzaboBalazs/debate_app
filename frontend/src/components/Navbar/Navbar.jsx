import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import CreateDebate from '../Popups/CreateDebate/CreateDebate';
import JoinDebate from '../Popups/JoinDebate/JoinDebate';

import handleClickTriggerCreate from '../Functions/handleClickCreate';
import getUserCurrent from '../Functions/getUserCurrent';
import leaveDebate from '../Functions/leaveDebate';

import axiosInstance from '../../axios';

// import './Navbar.css';
import './Navbar2.css';

import Logo from '../../images/logo.svg';


function CollapsibleExample() {
    let navigate = useNavigate();

    const [ triggerCreate, setTriggerCreate ] = useState(false);
    const [ triggerJoin, setTriggerJoin ] = useState(false);
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userName, setUserName ] = useState('');
    const [ inDebate, setInDebate ] = useState(false);
    const [ debateStatus, setDebateStatus ] = useState('/new-debate');

    // check if user is logged in
    useEffect(() => {

      getUserCurrent(setUserName, setLoggedIn, setInDebate);

      // lekerem a debate statuszat
      axiosInstance
        .get('debate/current/')
        .then((res) => {
          // console.log(res.data.status)
          if (res.data.status == 'lobby') {
            setDebateStatus('/new-debate')
          } else if (res.data.status == 'running') {
            setDebateStatus('/in-debate')
          } else if (res.data.status == 'finished') {
            setDebateStatus('/finished-debate')
          }
        })
        .catch((err) => {
          console.log(err);
        })

    }, []);

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

    // const leaveDebate = () => {
    //   axiosInstance
    //     .get('user/current/')
    //     .then((userRes) => {
    //       axiosInstance
    //         .get('debate/current/')
    //         .then((debateRes) => {
    //             axiosInstance
    //               .patch('user/current/', {"current_debate": null, 'role': null})
    //               .then(() => {
    //                 navigate('/');
    //                 getUserCurrent(setUserName, setLoggedIn, setInDebate);
    //                 })
    //               .catch((err) => {
    //                 console.log(err);
    //               })
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
      

  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="primary" className='nav'>
      <Container>
        <Navbar.Brand href="/" className='nav-brand'><img src={Logo} className='nav--logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" color='white'/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about-us" className='nav-link'>About Us</Nav.Link>
            <Nav.Link href="/debates" className='nav-link'>Debates</Nav.Link>
            {
              !inDebate ?
              <>
                <Nav.Link 
                  onClick={async () => { 
                    await handleClickTriggerCreate(navigate);
                  }}
                  className='nav-link yellow-text'>Create a Debate</Nav.Link>
                <Nav.Link onClick={handleClickTriggerJoin} className='nav-link yellow-text'>Join a Debate</Nav.Link>
              </>
              :
              <>
                <Nav.Link href={debateStatus} className='nav-link yellow-text'>Current Debate</Nav.Link>
                <Nav.Link onClick={
                  () => {
                  leaveDebate(setUserName, setLoggedIn, setInDebate, navigate);
                  }} className='nav-link yellow-text'>Leave Debate</Nav.Link>
              </>
            }
            {/* <Nav.Link href="/in-debate" className='nav-link'>Timer Page</Nav.Link> */}
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
