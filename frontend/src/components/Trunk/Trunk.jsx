import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Container } from 'react-bootstrap';

import './Trunk.css';

function Trunk() {
    const [ loggedIn, setLoggedIn ] = useState(false); 

    // check if user is logged in
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        console.log(accessToken);
        if (accessToken === null) {
            console.log('not logged in bruh')
        } else {
          setLoggedIn(true);
        //   setUserName('Jani');
          console.log('logged in');
        }
      }, []);

  return (
    <div className="bg-dark base">
        <div className="container p-0">
            <div className="trunk--container">
                <h1>DEBATE-CULTURE</h1>
                <p>Ákos majd ir ide valamit.</p>
                <div className="trunk--btns">
                { !loggedIn ? 
                    <>
                    <button
                        className='trunk--login-button text-uppercase'
                    >
                        <Link className='trunk--login-link trunk--link-text' to='/log-In'><span className='white-text'>Sign In</span></Link>
                    </button>
                    <button 
                        className='trunk--signin-button text-uppercase'
                    >
                        <Link className="trunk--signup-link trunk--link-text" to='/sign-up'><span className='white-text'>Register</span></Link>
                    </button>
                    </>
                : ''
                }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Trunk