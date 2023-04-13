import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axios';

import './NotReady.css';

function NotReady(props) {

    return (props.trigger) ? (
        <div className='join-debate'>
            <div className="join-debate--inner">
                <button className="join-debate--close-btn" onClick={() => props.setTrigger(false)}>X</button>
                { props.loggedIn ?
                <>
                <h3 className="join-debate--text white-text">Sorry, but you first have to be ready...</h3>
                <button
                    className="join-debate--next-btn"
                >
                    Okay, I'll press that button
                </button>
                </>
                :
                <h1>You have to be logged in first, in order to join a debate.</h1>
                }
            </div>
        </div>
    ) : "";
}

export default NotReady
