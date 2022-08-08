import React from 'react'
import { Button } from "../Button/Button";

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
                        to="log-In"
                        className='btns'
                        buttonStyle='btn--outline'
                        buttonSize='btn--large'
                    >
                        Log-In
                    </Button>
                    <Button
                        to="sign-up"
                        className='btns'
                        buttonStyle='btn--primary'
                        buttonSize='btn--large'
                    >
                        Sign-Up
                    </Button>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Trunk