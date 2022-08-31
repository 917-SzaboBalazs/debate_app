import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';

import JoinDebate from '../Popups/JoinDebate/JoinDebate';
import CreateDebate from '../Popups/CreateDebate/CreateDebate';

import './Trunk.css';

function Trunk() {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ triggerCreate, setTriggerCreate ] = useState(false);
    const [ triggerJoin, setTriggerJoin ] = useState(false);
    const [ inDebate, setInDebate ] = useState(false);
    const navigate = useNavigate();

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
        console.log('Create pressed');
        setTriggerCreate(true);
    }

    const handleClickTriggerJoin = () => {
        console.log('Join pressed');
        setTriggerJoin(true);
        }

    const leaveDebate = () => {
        console.log('leave pressed');
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
                <h1>DEBATE CULTURE</h1>
                <p>„It is better to debate a question without settling it than to settle a question without debating it.”</p>
                <div className="trunk--btns">
                { !loggedIn ?
                    <>
                    <button
                        className='trunk--login-button text-uppercase'
                    >
                        <Link className='trunk--login-link trunk--link-text' to='/log-In'><span className='white-text'>Log In</span></Link>
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
                                    onClick={handleClickTriggerJoin} 
                                >
                                    <div className='trunk--login-link trunk--link-text' ><span className='white-text'>Join</span></div>
                                </button>
                                <button
                                    className='trunk--signin-button text-uppercase'
                                    onClick={handleClickTriggerCreate}
                                >
                                    <div className="trunk--signup-link trunk--link-text" ><span className='white-text'>Create</span></div>
                                </button>
                            </>
                            :
                            <>
                                <button
                                    className='trunk--login-button text-uppercase'
                                    href='/new-debate'
                                    onClick={() => {
                                        navigate('/new-debate');
                                    }}
                                >
                                    <Link className='trunk--login-link trunk--link-text' to='/new-debate'><span className='white-text'>Current</span></Link>
                                </button>
                                <button
                                    className='trunk--signin-button text-uppercase'
                                    onClick={leaveDebate}
                                >
                                    <div className="trunk--signup-link trunk--link-text" ><span className='white-text'>Leave</span></div>
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
