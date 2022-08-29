import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useNavigate } from 'react';
import axiosInstance from '../../axios';

import JoinDebate from '../Popups/JoinDebate/JoinDebate';
import CreateDebate from '../Popups/CreateDebate/CreateDebate';

import './Trunk.css';

function Trunk() {
    const [ loggedIn, setLoggedIn ] = useState(false); 
    const [ triggerCreate, setTriggerCreate ] = useState(false);
    const [ triggerJoin, setTriggerJoin ] = useState(false);
    const [ inDebate, setInDebate ] = useState(false);

    // let navigate = useNavigate();

    // check if user is logged in
    useEffect(() => {
      axiosInstance
        .get('user/current/')
        .then((res) => {
          console.log(res);
          setLoggedIn(true);
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
    }

    const handleClickTriggerJoin = () => {
        setTriggerJoin(true);
        }

    const leaveDebate = () => {
        axiosInstance
            .patch('user/current/', {"current_debate": null, 'role': null})
            .then((res) => {
            console.log('Sikeres kilépés');
            // navigate('/');
            window.location.reload(false);
            })
            .catch((err) => {
            console.log(err);
            console.log('Baj van');
            })
        }

  return (
    <div className="home--container">
        <div className="container">
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
                        {
                            !inDebate ? 
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
                            :
                            <>
                                <button
                                    className='trunk--login-button text-uppercase'
                                    href='/new-debate'
                                >
                                    <Link className='trunk--login-link trunk--link-text' to='/new-debate'><span className='white-text'>Current</span></Link>
                                </button>
                                <button 
                                    className='trunk--signin-button text-uppercase'
                                >
                                    <div className="trunk--signup-link trunk--link-text" onClick={leaveDebate}><span className='white-text'>Leave</span></div>
                                </button>
                            </>
                        }
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