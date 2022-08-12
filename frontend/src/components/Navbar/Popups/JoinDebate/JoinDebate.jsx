import React from 'react';
import { useState } from 'react';

import './JoinDebate.css';

function JoinDebate(props) {


    return (props.trigger) ? (
        <div className='join-debate'>
            <div className="join-debate--inner">
                <button className="join-debate--close-btn" onClick={() => props.setTrigger(false)}>X</button>
                <h3 className="join-debate--text">Enter the debate code: </h3>
                <input type="text" placeholder='enter code' className="join-debate--code" />
                <button className="join-debate--next-btn">Next</button>
            </div>
        </div>
    ) : "";
}

export default JoinDebate