import React from 'react';
import { useState, useEffect } from 'react';

import GreenStart from '../../images/start-green.svg';
import WhiteStart from '../../images/start-white.svg';
import RedStop from '../../images/stop-red.svg';
import WhiteStop from '../../images/stop-white.svg';
import BlueRes from '../../images/reset-blue.svg';
import WhiteRes from '../../images/reset-white.svg';

import './InDebateTimer.css'

function InDebateTimer() {
    const [ seconds, setSeconds ] = useState(0);
    const [ running, setRunning ] = useState(false);
    const [ isMouse, setMouse ] = useState(false);
    const [ isMouseRes, setMouseRes ] = useState(false);

    useEffect(() => {
        let interval;

        if (running) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => 
                    prevSeconds + 10
                );

                if (seconds > 180000) {
                    setRunning(false);
                }
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        };

        return () => clearInterval(interval);
    }, [running, seconds]);

    const handleMouse = () => {
        setMouse(prev => !prev);
    }

    const handleMouseRes = () => {
        setMouseRes(prev => !prev);
    }

    return (
        <div className="indebate--base base">
            <div className="indebate--container container bg-light">
                <div className="indebate--stopwatch row text-center">
                    <div className="indebate--numbers">
                        <span>{("0" + Math.floor((seconds / 60000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((seconds / 1000) % 60)).slice(-2)}:</span>
                        <span>{("0" + ((seconds / 10) % 100)).slice(-2)}</span>
                    </div>
                    <div className="indebate--buttons text-center">
                        <button 
                            className={`indebate--button col-12 indebate--start-button ${!running ? 'indebate--start' : 'indebate--stop'}`}
                            onClick={() => {
                                if (seconds < 180000)
                                setRunning(prev => !prev)
                            }}
                            onMouseOver={handleMouse}
                            onMouseOut={handleMouse}
                        >
                            <img src={running ? 
                                (isMouse ? RedStop : WhiteStop) : 
                                (isMouse ? GreenStart : WhiteStart)
                            } className='indebate--start-stop' />
                        </button>
                        <br/>
                        <button 
                            className='indebate--button col-12 indebate--reset-button'
                            onClick={() => setSeconds(0)}
                            onMouseOver={handleMouseRes}
                            onMouseOut={handleMouseRes}
                        >  
                            <img src={
                                !isMouseRes ? 
                                    WhiteRes :
                                    BlueRes
                            } 
                            className='indebate--reset'
                            />
                        </button>       
                    </div>
                </div>
            </div>
        </div>
      );
}

export default InDebateTimer