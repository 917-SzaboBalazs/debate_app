import React from 'react';
import { useState } from 'react';

import './JoinDebate.css';

function JoinDebate(props) {
    const [ code, setCode ] = useState('');

    const handleNext = () => {
        if (code === '') {
            alert('The input fied is empty');
            return;
        }

        alert('GG');
    }

    return (props.trigger) ? (
        <div className='join-debate'>
            <div className="join-debate--inner">
                <button className="join-debate--close-btn" onClick={() => props.setTrigger(false)}>X</button>
                { props.loggedIn ? 
                <> 
                <h3 className="join-debate--text">Enter the debate code: </h3>
                <input 
                    type="text" 
                    value={code} 
                    placeholder='enter code' 
                    className="join-debate--code"
                    onChange={(e) => {
                        setCode(e.value);
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