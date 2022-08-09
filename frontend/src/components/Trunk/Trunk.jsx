import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import '../../App.css';
import './Trunk.css';

function Trunk() {
  return (
    <div className="bg-dark base">
        <Container>
            <div className="trunk--container">
                <h1>DEBATE</h1>
                <p>The Official Debate App of Mathias Corvinus Collegium.</p>
                <div className="trunk--btns">
                    <Button
                        className='trunk--login-button text-uppercase border border-3'
                        variant='outline-primary'
                        size='lg'
                    >
                        <Link className='trunk--login-link trunk--link-text' to='/log-In'><span>Log-In</span></Link>
                    </Button>
                    <Button
                        className='trunk--signin-button text-uppercase'
                        variant='primary'
                        size='lg'
                    >
                        <Link className="trunk--singup-link trunk--link-text" to='/sign-up'><span>Sign-Up</span></Link>
                    </Button>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Trunk