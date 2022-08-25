import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import JoinDebate from '../Navbar/Popups/JoinDebate/JoinDebate';
import CreateDebate from '../Navbar/Popups/CreateDebate/CreateDebate';

import './Trunk.css';

function Trunk() {
    const [ loggedIn, setLoggedIn ] = useState(false); 
    const [ triggerCreate, setTriggerCreate ] = useState(false);
    const [ triggerJoin, setTriggerJoin ] = useState(false);

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

    const handleClickTriggerCreate = () => {
        setTriggerCreate(true);
    }

    const handleClickTriggerJoin = () => {
        setTriggerJoin(true);
        }

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
                : 
                    <>
                        <button
                            className='trunk--login-button text-uppercase'
                        >
                            <div className='trunk--login-link trunk--link-text' onClick={handleClickTriggerJoin} ><span className='white-text'>Join</span></div>
                        </button>
                        <button 
                            className='trunk--signin-button text-uppercase'
                        >
                            <div className="trunk--signup-link trunk--link-text" onClick={handleClickTriggerCreate}><span className='white-text'>Create</span></div>
                        </button>
                    </>
                }
                </div>
            </div>
        </div>
        <CreateDebate loggedIn={loggedIn} trigger={triggerCreate} setTrigger={setTriggerCreate} />
        <JoinDebate loggedIn={loggedIn} trigger={triggerJoin} setTrigger={setTriggerJoin} />
    </div>
  )
}

export default Trunk