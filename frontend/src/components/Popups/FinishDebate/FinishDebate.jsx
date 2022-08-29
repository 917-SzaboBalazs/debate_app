import axios from 'axios';
import React from 'react';
import { useState } from 'react';

import axiosInstance from '../../../axios';

import './FinishDebate.css';

function FinishDebate(props) {

    const handlePro = () => {
        axiosInstance
            .patch('debate/current/', {'winner': 'pro', 'status':'finished'})
            .then((res) => {
                props.setTrigger(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleCon = () => {
        axiosInstance
            .patch('debate/current/', {'winner': 'con', 'status':'finished'})
            .then((res) => {
                props.setTrigger(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    
  return (props.trigger) ? (
    <div className="finish-debate">
        <div className="finish-debate--inner row">
            <button className="finish-debate--close-btn" onClick={() => props.setTrigger(false)}>X</button>
            <div className="finish-debate--winner-field row">
              <h3 className="finish-debate--winner-text col-12 white-text pb-4">Winner:</h3>
              <div className="finish-debate--buttons-field d-flex align-items-center justify-content-center text-center"></div>
              <button className="finish-debate--pro finish-debate--button col-5" onClick={handlePro}>PRO</button>
              <button className="finish-debate--con finish-debate--button col-5" onClick={handleCon}>CON</button>
            </div>
        </div>
    </div>
  ) : null;
}

export default FinishDebate