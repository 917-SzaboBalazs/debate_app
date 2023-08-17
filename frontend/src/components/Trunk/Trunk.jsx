import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import handleClickTriggerCreate from '../Functions/handleClickCreate';

import JoinDebate from '../Popups/JoinDebate/JoinDebate';
import CreateDebate from '../Popups/CreateDebate/CreateDebate';
import leaveDebate from '../Functions/leaveDebate';

import './Trunk.css';

function Trunk({ loggedIn, inDebate, setInDebate, status, setStatus }) {
    const [ triggerCreate, setTriggerCreate ] = useState(false);
    const [ triggerJoin, setTriggerJoin ] = useState(false);

    const navigate = useNavigate();

    const handleClickTriggerJoin = () => {
        setTriggerJoin(true);
    }

  return (
    <div className="home--container ">
        <div className="container fade-in">
            <div className="trunk--container">
                <h1>DEBATE CULTURE</h1>
                <p>"It is better to debate a question without settling it than to settle a question without debating it."</p>
                <div className="trunk--btns">

                        {!loggedIn && 
                        <>
                             <h2 className='trunk--btns--helper-text'>Create a Free Account and Start Debating Now!</h2>
                             <button
                                className='trunk--login-button text-uppercase'
                                onClick={() => {
                                    navigate('/log-in');
                                }} 
                            >
                            <div className='trunk--login-link trunk--link-text' ><span className='white-text'>Log In</span></div>
                            </button>
                            <button
                                className='trunk--signin-button text-uppercase'
                                onClick={() => {
                                    navigate('/sign-up')
                                }}
                            >
                            <div className="trunk--signup-link trunk--link-text" ><span className='white-text'>Sign Up</span></div>
                            </button>
                            
                        </>}

                        {loggedIn && !inDebate &&
                            <>
                                <h2 className='trunk--btns--helper-text'>Let's Start a Debate!</h2>
                                <button
                                    className='trunk--login-button text-uppercase'
                                    onClick={handleClickTriggerJoin} 
                                >
                                    <div className='trunk--login-link trunk--link-text' ><span className='white-text'>Join</span></div>
                                </button>
                                <button
                                    className='trunk--signin-button text-uppercase'
                                    onClick={() => {
                                        handleClickTriggerCreate(navigate, setInDebate, setStatus)
                                    }}
                                >
                                    <div className="trunk--signup-link trunk--link-text" ><span className='white-text'>Create</span></div>
                                </button>
                            </>
                        }

                        {loggedIn && inDebate && 
                            <>
                                <h2 className='trunk--btns--helper-text'>Go Back To Your Debate!</h2>
                                <button
                                    className='trunk--login-button text-uppercase'
                                >
                                    <Link className='trunk--login-link trunk--link-text' to={status}><span className='white-text'>Current</span></Link>
                                </button>
                                <button
                                    className='trunk--signin-button text-uppercase'
                                    onClick={() => leaveDebate(setInDebate, setStatus, navigate)}
                                >
                                    <div className="trunk--signup-link trunk--link-text" ><span className='white-text'>Leave</span></div>
                                </button>
                            </>
                        }
                </div>
            </div>
        </div>

        <CreateDebate loggedIn={loggedIn} trigger={triggerCreate} setTrigger={setTriggerCreate} setInDebate={setInDebate} setStatus={setStatus} />
        <JoinDebate loggedIn={loggedIn} trigger={triggerJoin} setTrigger={setTriggerJoin} setInDebate={setInDebate} setStatus={setStatus} />
    </div>
  )
}

export default Trunk
