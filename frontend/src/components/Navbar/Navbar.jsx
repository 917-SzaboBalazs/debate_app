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

import { Link } from 'react-router-dom';

// import './Navbar.css';
import './Navbar2.css';

import Logo from '../../images/logo.svg';

function CreateDebateComponent(props) {
  const { loggedIn, navigate, setInDebate } = props;

  if (loggedIn) {
    return (
      <Nav.Link 
        onClick={async () => { 
          await handleClickTriggerCreate(navigate, setInDebate);
        }}
        className='nav-link yellow-text'>Create a Debate
      </Nav.Link>
    )
  }

  return(<></>)
}

function CollapsibleExample({ loggedIn, setLoggedIn, inDebate, setInDebate }) {
    let navigate = useNavigate();

    const [ triggerCreate, setTriggerCreate ] = useState(false);
    const [ triggerJoin, setTriggerJoin ] = useState(false);
    const [ userName, setUserName ] = useState('');
    const [ debateStatus, setDebateStatus ] = useState('/new-debate');

    const [loading, setLoading] = useState(true);

    // check if user is logged in
    useEffect(() => {

      getUserCurrent(setUserName, setLoggedIn, setInDebate);

      // lekerem a debate statuszat
      axiosInstance
        .get('debate/current/')
        .then((res) => {
          if (res.data.status == 'lobby') {
            setDebateStatus('/new-debate')
          } else if (res.data.status == 'running') {
            setDebateStatus('/in-debate')
          } else if (res.data.status == 'finished') {
            setDebateStatus('/finished-debate')
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        })

    }, [loggedIn, inDebate]);

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
      })
        .catch((err) => {
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
    //               })
    //         })
    //         .catch((err) => {
    //         });
    //     })
    //     .catch((err) => {
    //     })
      

  if (loading)
  {
    return <></>
  }

  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="primary" className='nav fade-in'>
      <Container>
        <Navbar.Brand as={Link} to="/" className='nav-brand'><img src={Logo} className='nav--logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" color='white'/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/about-us" className='nav-link'>About Us</Nav.Link>
          <Nav.Link as={Link} to="/debates" className='nav-link'>Debates</Nav.Link>

            {
              !inDebate ?
              <>
                {loggedIn && <Nav.Link onClick={handleClickTriggerJoin} className='nav-link yellow-text'>Join a Debate</Nav.Link> }
                <CreateDebateComponent loggedIn={loggedIn} setInDebate={setInDebate} navigate={navigate} />
              </>
              :
              <>
                <Nav.Link as={Link} to={debateStatus} className='nav-link yellow-text'>Current Debate</Nav.Link>
                <Nav.Link onClick={
                  () => {
                  leaveDebate(setUserName, setLoggedIn, setInDebate, navigate);
                  }} className='nav-link yellow-text'>Leave Debate</Nav.Link>
              </>
            }
          </Nav>
          <Nav>
            { !loggedIn ?
                <>
                  <Nav.Link as={Link} to="/log-In" className='nav-link'>Log In</Nav.Link>
                  <Nav.Link as={Link} to="/sign-up" className='nav-link'>Sign Up</Nav.Link>

                </>
                :
                <>
                  <Nav.Link as={Link} to="/profile" className='nav-link'>{userName}</Nav.Link>
                  <Nav.Link onClick={logOut}>Log Out</Nav.Link>
                </>
            }
          </Nav>
          <CreateDebate loggedIn={loggedIn} trigger={triggerCreate} setTrigger={setTriggerCreate} />
          <JoinDebate loggedIn={loggedIn} trigger={triggerJoin} setTrigger={setTriggerJoin} setInDebate={setInDebate} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default CollapsibleExample;
