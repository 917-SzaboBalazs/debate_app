import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import handleClickTriggerCreate from '../Functions/handleClickCreate';

import JoinDebate from '../Popups/JoinDebate/JoinDebate';
import CreateDebate from '../Popups/CreateDebate/CreateDebate';

import './Trunk.css';

function Trunk({ loggedIn, inDebate, setInDebate, status, setStatus, closeMenu }) {
    const [ triggerCreate, setTriggerCreate ] = useState(false);
    const [ triggerJoin, setTriggerJoin ] = useState(false);

    

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // let navigate = useNavigate();

    // check if user is logged in
    useEffect(() => {
      axiosInstance
        .get('user/current/')
        .then((res) => {

          axiosInstance
            .get('debate/current/')
            .then((res) => {
                if (res.data.status === 'lobby') {
                    setStatus('/new-debate')
                } else if (res.data.status === 'running') {
                    setStatus('/in-debate')
                } else if (res.data.status === 'finished') {
                    setStatus('/finished-debate')
                }

                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            }, []);
        })
        .catch((err) => {
          setLoading(false);
        });

        


    }, [loggedIn, inDebate]);

    const handleClickTriggerJoin = () => {
        setTriggerJoin(true);
        }

    const leaveDebate = () => {
        axiosInstance
            .patch('user/current/', {"current_debate": null, 'role': null})
            .then((res) => {
            // navigate('/');
            //window.location.reload(false);
            setInDebate(false);
            })
            .catch((err) => {
            })
        }

    if (loading)
    {
        return <div className="home--container"></div>
    }

  return (
    <div className="home--container fade-in">
        <div className="container">
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
                                        handleClickTriggerCreate(navigate, setInDebate)
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
                                    onClick={leaveDebate}
                                >
                                    <div className="trunk--signup-link trunk--link-text" ><span className='white-text'>Leave</span></div>
                                </button>
                            </>
                        }
                </div>
            </div>
        </div>
        <CreateDebate loggedIn={loggedIn} trigger={triggerCreate} setTrigger={setTriggerCreate} />
        <JoinDebate loggedIn={loggedIn} trigger={triggerJoin} setTrigger={setTriggerJoin} setInDebate={setInDebate} status={status} setStatus={setStatus} />
    </div>
  )
}

export default Trunk
