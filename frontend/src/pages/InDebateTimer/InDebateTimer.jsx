import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import { useTranslation } from 'react-i18next'

import FinishPopup from './Popups/FinishPopup';

// icon imports
import GreenStart from '../../images/start-green.svg';
import WhiteStart from '../../images/start-white.svg';
import RedStop from '../../images/stop-red.svg';
import WhiteStop from '../../images/stop-white.svg';
import BlueRes from '../../images/reset-blue.svg';
import WhiteRes from '../../images/reset-white.svg';
import YellowNext from '../../images/next-yellow.svg';
import WhiteNext from '../../images/next-white.svg';
import YellowBack from '../../images/back-yellow.svg';
import WhiteBack from '../../images/back-white.svg';

import FinishDebate from '../../components/Popups/FinishDebate/FinishDebate';

import './InDebateTimer.css'

function InDebateTimer() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [ triggerPopup, setTriggerPopup ] = useState(false);

    // const [ seconds, setSeconds ] = useState(0);
    const [ running, setRunning ] = useState(false);
    const [ isMouse, setMouse ] = useState(false);
    const [ isMouseRes, setMouseRes ] = useState(false);
    const [ isMouseNext, setMouseNext ] = useState(false);
    const [ isMouseBack, setMouseBack ] = useState(false);
    const [ currentlySpeaking, setCurrentlySpeaking ] = useState(1);
    const [ trigger, setTrigger ] = useState(false);
    // const [ secondsLeft, setSecondsLeft ] = useState(0);
    const [ seconds, setSeconds ] = useState(0);
    const [ minutes, setMinutes ] = useState(0);
    const [ role, setRole ] = useState('');
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ inDebate, setInDebate ] = useState(false);
    const [ motion, setMotion ] = useState('');
    const [ entryCode, setEntryCode ] = useState('');
    const [ winner, setWinner ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ speakerTime, setSpeakerTime ] = useState('');

    const [ poi, setPOI ] = useState(false);
    const [ POIseconds, setPOIseconds ] = useState(15);

    const [loading, setLoading] = useState(true);
    let lang = localStorage.getItem('lang')
    var speakerRole;
    if (lang=== 'en')
    {
        speakerRole = [ 'Opening Government - 1', 'Opening Opposition - 1', 'Opening Government - 2', 'Opening Opposition - 2', 'Closing Government - 1', 'Closing Opposition - 1', 'Closing Government - 2', 'Closing Opposition - 2'];
    }
    else{
        speakerRole = [ 'Nyitó Kormány - 1', 'Nyitó Ellenzék - 1', 'Nyitó Kormány - 2', 'Nyitó Ellenzék - 2', 'Záró Kormány - 1', 'Záró Ellenzék - 1', 'Záró Kormány - 2', 'Záró Ellenzék - 2'];
    }
    
    
    // check if user is logged in
    useEffect(() => {

        axiosInstance
          .get('user/current/')
          .then((res) => {
            // console.log(res);
            setLoggedIn(true);
            if (res.data.current_debate != null) {
                setInDebate(true);

                if (res.data.role != null) {
                    setRole(res.data.role);
                }
            } else {
              setInDebate(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });


      }, []);

      useEffect(() => {
        const interval=setInterval(() =>{

            // debate-status
            axiosInstance
            .get('debate/current/')
            .then((res) => {
                setSpeakerTime(res.data.speaker_time);
                setMotion(res.data.motion);
                setEntryCode(res.data.entry_code);
                setCurrentlySpeaking(res.data.current_number);
                setWinner(res.data.winner);
                setStatus(res.data.status);

                if (res.data.status == 'finished') {
                    navigate('/finished-debate')
                }

                setLoading(false);

            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            }, []);

            // timer
            axiosInstance
                .get('timer/')
                .then((res) => {

                    if (res.data.state == "paused")
                    {
                      setRunning(false);
                    }
                    else
                    {
                      setRunning(true);
                    }

                    var secs = res.data["remaining-time"];
                    let min = Math.floor(secs / 60);
                    let sec = secs - min * 60;
                    setMinutes(min);
                    setSeconds(sec);
                })

            // POI
            axiosInstance
              .get('timer/poi/')
              .then((res) => {
                setPOI(true);
                setPOIseconds(res.data['remaining-time']);
              })
              .catch((err) => {
                setPOI(false);
              });

        }, 500);

        return () => clearInterval(interval);
      }, []);

    const handlePOI = () => {
      axiosInstance
        .post('timer/poi/')
        .then(() => {
            console.log('Poi set');
        })
        .catch(() => {

        })

        // ide kell egy axios-posts
    }

    const handleMouse = () => {
        setMouse(prev => !prev);
    }

    const handleMouseRes = () => {
        setMouseRes(prev => !prev);
    }

    const handleMouseNext = () => {
        setMouseNext(prev => !prev);
    }

    const handleMouseBack = () => {
        setMouseBack(prev => !prev);
    }

    const handleNext = () => {
        if (currentlySpeaking < 8 && !running) {
            let currentNumber = currentlySpeaking + 1;

            axiosInstance
                .patch('debate/current/', {'current_number': currentNumber})
                .then((res) => {
                    setCurrentlySpeaking(currentNumber);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    const handleBack = () => {
        if (currentlySpeaking > 1 && !running) {
            let currentNumber = currentlySpeaking - 1;

            axiosInstance
                .patch('debate/current/', {'current_number': currentNumber})
                .then((res) => {
                    // console.log(res);
                    setCurrentlySpeaking(currentNumber);
                })
                .catch((err) => {
                    console.log(err);
            });
        }
    }

    const leaveDebate = () => {
        axiosInstance
            .patch('user/current/', {"current_debate": null, 'role': null})
            .then((res) => {
            console.log('Sikeres kilépés');
            navigate('/');
            window.location.reload(false);
            })
            .catch((err) => {
            console.log(err);
            console.log('Baj van');
            })
    }

    const handleStart = () => {

        if (!running) {
            axiosInstance
                .patch('timer/', {'state': 'running'})
                .then(() => {
                    setRunning(true);
                })
                .catch((err) => {
                    console.log(err);
                });
            return;
        }

        axiosInstance
            .patch('timer/', {'state': 'paused'})
            .then(() => {
                setRunning(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleReset = () => {
        axiosInstance
            .patch('timer/', {'state': 'reset'})
            .then(() => {
                setRunning(false);
            })
            .catch((err) => {
                console.log(err);
            });

        axiosInstance
            .patch('timer/poi/', {'state': 'reset'})
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleFinish = () => {
        //if (currentlySpeaking == 8) {
            // setFinished(true);
            // setTrigger(true);
        //}
        setTriggerPopup(true);
        //navigate('/results');
    }

    const handleSetTime = (ev) => {
        axiosInstance
            .patch('debate/current/', {'speaker_time': ev.target.value})
            .then(() => {
                axiosInstance
                    .patch('timer/', {'state': 'reset'})
                    .then(() => {
                        setRunning(false);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    if (loading) {
        return <div className="indebate--base base"><div className="indebate--container fade-in"></div></div>
    }

    return (
        <>
        <div className="indebate--base base">
            <div className="indebate--container fade-in">
                { loggedIn && inDebate ?
                <>
                {
                    status === "finished" ?
                <>
                <div className="in-debate--hiba row d-flex justify-content-center align-items-center">
                        <h1 className='col-12 text-center'>A {winner} csapat nyert!</h1>
                        <button
                            className="in-debate--leave-debate white-text col-4"
                            onClick={leaveDebate}
                        >
                            Leave Debate
                        </button>
                    </div>
                </>
                :
                <>
                <div className="row indebate--entry-code-field">
                    <h2 className="indebate--entry-code-text col-12 text-center">{t('inDebate.code')} {entryCode}</h2>
                </div>
                <div className="row indebate--motion-field">
                    <h1 className="indebate--motion-text col-12 text-center">"{motion}"</h1>
                </div>
                <div className="row indebate--current-speaker">
                    <div className="col-12 text-center">
                        {/* <h3>{t('inDebate.currentSpeacer')} {currentlySpeaking} ({speakerRole[currentlySpeaking - 1]})</h3> */}
                        <h3>{t('inDebate.currentSpeacer')} {speakerRole[currentlySpeaking - 1]}</h3>
                        {/*<h3>A te szereped: {role}</h3>*/}
                    </div>
                </div>
                <div className="indebate--stopwatch row text-center">
                    <div className="indebate--numbers">
                        <span>{minutes}:</span>
                        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
                        <span 
                        className={poi ? "in-debate--poi-seconds" : "in-debate--poi-seconds display-none"}
                        >{POIseconds < 10 ? "0" + POIseconds : POIseconds}</span>   
                        {/* <span>{("0" + ((secondsLeft / 100) % 100)).slice(-2)}</span> */}
                    </div>
                    { role === 'judge'  ? <>
                            <div className="row justify-content-center">   
                                {!poi ?  
                                <button 
                                    className="poi-button poi-element col-3"
                                    onClick={() => {
                                        handlePOI();
                                    }}
                                    disabled={!running}
                                >
                                    POI
                                </button>
                            
                            : 
                                <button 
                                    className="poi-button poi-element col-3"
                                    disabled
                                    >
                                    POI
                                </button>
                            }
                            </div>
                
                    <div className="indebate--buttons text-center">
                        <button
                            className={`indebate--button col-12 indebate--start-button ${!running ? 'indebate--start' : 'indebate--stop'}`}
                            onClick={handleStart}
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
                            onClick={handleReset}
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
                        <br/>
                        <div className="indebate--role-controls">
                        <button
                            className="indebate--button indebate--back-button col-12"
                            onClick={handleBack}
                            onMouseOver={handleMouseBack}
                            onMouseOut={handleMouseBack}
                            disabled={running || currentlySpeaking === 1}
                        >
                            <img src={
                                !isMouseBack || running || currentlySpeaking === 1 ?
                                    WhiteBack :
                                    YellowBack
                            }
                            className='indebate--back'
                            />
                        </button>
                        <button
                            className="indebate--button indebate--next-button col-12 text-center"
                            onClick={handleNext}
                            onMouseOver={handleMouseNext}
                            onMouseOut={handleMouseNext}
                            disabled={running || currentlySpeaking === 8}
                        >
                            <img src={
                                !isMouseNext || running || currentlySpeaking === 8 ?
                                    WhiteNext :
                                    YellowNext
                            }
                            className='indebate--next'
                            />
                        </button>
                        {/* <div className="in-debate--speaker-time row d-flex justify-content-center">
                            <h2 className="in-debate--speaker-time-text col-md-2">Set time:</h2>
                            <input type="number" className="in-debate--speaker-time-element col-md-3 p-sm-2 text-center" value={speakerTime} onChange={(ev) => {handleSetTime(ev)}}/>
                        </div> */}
                        <div className="row in-debate--finish-field row d-flex justify-content-center p-4">
                            <button
                                className="in-debate--finish-button col-3"
                                onClick={handleFinish}
                                disabled={running}
                            >
                                finish
                            </button>
                        </div>
                        </div>
                    </div>
                    </>
                    :
                    null }
                </div>
                </>
                }
                </>

                :
                <>
                    <div className="in-debate--hiba row d-flex justify-content-center align-items-center">
                        <h1 className='col-12 text-center'>Valami nagyon nem jó tesó</h1>
                    </div>
                </>
                }
            </div>
        </div>
        <FinishDebate trigger={trigger} setTrigger={setTrigger} />
        <FinishPopup trigger={triggerPopup} setTrigger={setTriggerPopup} navigate={navigate}/>
      </>
      );
}

export default InDebateTimer
