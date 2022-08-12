import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import CreateDebate from './Popups/CreateDebate/CreateDebate';
import JoinDebate from './Popups/JoinDebate/JoinDebate';

import './Navbar.css';
import './Navbar2.css';

function CollapsibleExample() {
    const [ triggerCreate, setTriggerCreate ] = useState(false);
    const [ triggerJoin, setTriggerJoin ] = useState(false);

    const handleClickTriggerCreate = () => {
        setTriggerCreate(true);
        console.log(triggerCreate);
    }

    const handleClickTriggerJoin = () => {
      setTriggerJoin(true);
    }

  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="primary" className='nav'>
      <Container>
        <Navbar.Brand href="/" className='nav-brand'>React <span className='nav--span'>Bootstrap</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" color='white'/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className='nav-link'>Debates</Nav.Link>
            <Nav.Link onClick={handleClickTriggerJoin} className='nav-link'>Join a Debate</Nav.Link>
            <Nav.Link onClick={handleClickTriggerCreate} className='nav-link'>Create a Debate</Nav.Link>
            <Nav.Link href="/about-us" className='nav-link'>About Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/log-In">Login</Nav.Link>
            <Nav.Link href="/sign-up">Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <CreateDebate trigger={triggerCreate} setTrigger={setTriggerCreate} />
    <JoinDebate trigger={triggerJoin} setTrigger={setTriggerJoin} />
    </>
  );
}

export default CollapsibleExample;