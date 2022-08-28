import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axios';

import './JoinDebate.css';

function JoinDebate(props) {
    const [ debateCode, setDebateCode ] = useState('');
    let navigate = useNavigate();

    const handleNext = () => {
        if (debateCode === '') {
            alert('The input fied is empty');
            return;
        }

        console.log(debateCode);
        axiosInstance
            .get('debate/current/', {params: {
                "entry-code":debateCode
            }})
            .then((res) => {
                navigate('/new-debate');
                window.location.reload(false);

                axiosInstance
                  .patch('user/current/', {
                    'role': 'spectator'
                  })
                  .catch((err) => {
                    console.log(err);
                  })
            })
            .catch((err) => {
                alert('Non existing code');
            })
    }

    return (props.trigger) ? (
        <div className='join-debate'>
            <div className="join-debate--inner">
                <button className="join-debate--close-btn" onClick={() => props.setTrigger(false)}>X</button>
                { props.loggedIn ?
                <>
                <h3 className="join-debate--text white-text">Enter the debate code: </h3>
                <input
                    type="text"
                    value={debateCode}
                    placeholder='enter code'
                    className="join-debate--code"
                    onChange={(e) => {
                        setDebateCode(e.target.value);
                    }}
                />
                <button
                    className="join-debate--next-btn"
                    onClick={handleNext}
                >
                    Next
                </button>
                </>
                :
                <h1>You have to be logged in first, in order to join a debate.</h1>
                }
            </div>
        </div>
    ) : "";
}

export default JoinDebate
