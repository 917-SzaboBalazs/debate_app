import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import handleClickTriggerCreate from '../Functions/handleClickCreate';

import JoinDebate from '../Popups/JoinDebate/JoinDebate';
import CreateDebate from '../Popups/CreateDebate/CreateDebate';
import leaveDebate from '../Functions/leaveDebate';

import { useTranslation } from 'react-i18next'

import './Trunk.css';

function Trunk({ loggedIn, inDebate, setInDebate, status, setStatus }) {
    const [ triggerCreate, setTriggerCreate ] = useState(false);
    const [ triggerJoin, setTriggerJoin ] = useState(false);
    const { t } = useTranslation();
    
    

    const navigate = useNavigate();

    const handleClickTriggerJoin = () => {
        setTriggerJoin(true);
    }

    


  return (
    <div className="home--container ">
        <div className="container fade-in">
            <div className="trunk--container">
                <h1>DEBATE CULTURE</h1>
                <p>"It is better to debate a question without settling it than to settle a question without debating it."</p>
                <div className="trunk--btns">

                        {!loggedIn && 
                        <>
                             <h2 className='trunk--btns--helper-text'>{t("landing.notSignedIn.call")}</h2>
                             <button
                                className='trunk--login-button text-uppercase'
                                onClick={() => {
                                    navigate('/log-in');
                                }} 
                            >
                            <div className='trunk--login-link trunk--link-text' ><span className='white-text'>{t("landing.notSignedIn.label1")}</span></div>
                            </button>
                            <button
                                className='trunk--signin-button text-uppercase'
                                onClick={() => {
                                    navigate('/sign-up')
                                }}
                            >
                            <div className="trunk--signup-link trunk--link-text" ><span className='white-text'>{t("landing.notSignedIn.label2")}</span></div>
                            </button>
                            
                        </>}

                        {loggedIn && !inDebate &&
                            <>
                                <h2 className='trunk--btns--helper-text'>{t("landing.signedIn.call")}</h2>
                                <button
                                    className='trunk--login-button text-uppercase'
                                    onClick={handleClickTriggerJoin} 
                                >
                                    <div className='trunk--login-link trunk--link-text' ><span className='white-text'>{t("landing.signedIn.label1")}</span></div>
                                </button>
                                <button
                                    className='trunk--signin-button text-uppercase'
                                    onClick={() => {
                                        handleClickTriggerCreate(navigate, setInDebate, setStatus)
                                    }}
                                >
                                    <div className="trunk--signup-link trunk--link-text" ><span className='white-text'>{t("landing.signedIn.label2")}</span></div>
                                </button>
                            </>
                        }

                        {loggedIn && inDebate && 
                            <>
                                <h2 className='trunk--btns--helper-text'>{t("landing.inDebate.call")}</h2>
                                <button
                                    className='trunk--login-button text-uppercase'
                                >
                                    <Link className='trunk--login-link trunk--link-text' to={status}><span className='white-text'>{t("landing.inDebate.label1")}</span></Link>
                                </button>
                                <button
                                    className='trunk--signin-button text-uppercase'
                                    onClick={() => leaveDebate(setInDebate, setStatus, navigate)}
                                >
                                    <div className="trunk--signup-link trunk--link-text" ><span className='white-text'>{t("landing.inDebate.label2")}</span></div>
                                </button>
                            </>
                        }
                </div>
            </div>
        </div>

        <CreateDebate loggedIn={loggedIn} trigger={triggerCreate} setTrigger={setTriggerCreate} setInDebate={setInDebate} setStatus={setStatus} />
        <JoinDebate loggedIn={loggedIn} trigger={triggerJoin} setTrigger={setTriggerJoin} setInDebate={setInDebate} setStatus={setStatus} />
    </div>
  )
}

export default Trunk
