import React from 'react';

import axiosInstance from '../../../axios';

import './FinishDebate.css';


function FinishDebate(props) {

    const handlePro = () => {
        axiosInstance
            .patch('debate/current/', {'result': 'pro', 'status':'finished'})
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

    const handleDraw = () => {
        axiosInstance
            .patch('debate/current/', {'winner': 'draw', 'status':'finished'})
            .then((res) => {
                props.setTrigger(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleNoWinner = () => {
        axiosInstance
            .patch('debate/current/', {'winner': 'no winner', 'status':'finished'})
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
              <h3 className="finish-debate--winner-text col-12 white-text pb-4">Ki nyert?</h3>
              <div className="finish-debate--buttons-field d-flex align-items-center justify-content-center text-center"></div>
              <div className="finish-debate--buttons-container">
                <button className="finish-debate--pro finish-debate--button col-4" onClick={handlePro}>PRO</button>
                <button className="finish-debate--con finish-debate--button col-4" onClick={handleCon}>KONTRA</button>
                <button className="finish-debate--draw finish-debate--button col-4" onClick={handleDraw}>DÖNTETLEN</button>
                <button className="finish-debate--no-winner finish-debate--button col-4" onClick={handleNoWinner}>NINCS GYŐZTES</button>
              </div>
            </div>
        </div>
    </div>
  ) : null;
}

export default FinishDebate
