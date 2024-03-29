// A NEW DEBATE MOBIL VERZIOJA

import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next'

import './NewDebate.css';

import axiosInstance from '../../axios';
import handleChoose from './Functions/handleChoose';
import handleMotion from './Functions/handleMotion';
import listerMobile from './Functions/listerMobile';
import getDebateCurrent from './Functions/getDebateCurrent';
import getUserCurrent from './Functions/getUserCurrent';
import RandomMotionSetter from './Components/randomMotionSetter';
import spectatorLister from './Functions/spectatorLister';

function NewDebateMobile() {
    const navigate = useNavigate();
    const [ debateType, setDebateType ] = useState(''); // -ez lehet nem fog kelleni most
    const [ entryCode, setEntryCode ] = useState('');
    const [ someError, setSomeError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ motion, setMotion ] = useState("");
    const [ currRole, setCurrRole ] = useState('spectator');
    const [ focused, setFocused ] = useState(false);

    const [ posts, setPosts ] = useState([]);
    const [ allUsers, setAllUsers] = useState([]);
    const { t } = useTranslation();
    let lang = localStorage.getItem('lang')

    const ref = useRef(null);

    useEffect(() => {
        getUserCurrent(setCurrRole);
  
        const interval = setInterval(() => {
        getDebateCurrent (
            setSomeError,
            setErrorMessage,
            setDebateType,
            setEntryCode,
            focused,
            setMotion,
            setAllUsers,
            setPosts,
            setDebaterArray,
            navigate
        )

        }, 500)
  
          return () => {clearInterval(interval)};
      }, [focused, navigate]);
      
    useEffect(() => {
        if (motion === null || motion.length === 0) {
            return;
        }   

        const target_lang = lang == "en" ? "en-gb" : "hu";

        axiosInstance
            .post("motion/translate/", {
                "motion": motion,
                "target_lang": target_lang
            })
            .then((res) => {
                
                axiosInstance
                    .patch("debate/current/", {
                        "motion": res.data.motion
                    })
                    .then((res) => {

                    })
                    .catch((err) => {

                    })

            })
            .catch((err) => {
            })
    }, [t]);

      useEffect(() => {
        axiosInstance
        .get('debate/current/')
        .then((res) => {
            // console.log(res);
      
            setMotion(res.data.motion);
        
        })
        // abban az esetben ha nincs current user (tehat guest lesz)
        .catch((err) => {
            console.log("nem vagy bejelentkezve");
        });
    }, []);


    function setDebaterArray(teamSize)
    {
        const debaterArr = [];

        for (let i = 1; i <= teamSize; i++)
        {
            debaterArr.push(i)
        }

        return debaterArr;
    }

    // hozza kell meg adjam a motiont
    const startDebate = () => {
        axiosInstance
            .patch('debate/current/', {'status': 'running'})
            .then((res) => {
                console.log('The debate is running.');
                navigate('/in-debate');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className='new-debate--background new-debate--background--mobile  base'>
            <div className="new-debate--container container fade-in">
                {
                    
                    someError ?
                        <>
                            <div className="new-debate--not-logged-in-cont row ">
                                <h1 className="new-debate--not-logged-in-text white-text">
                                    {errorMessage}
                                </h1>
                            </div>
                        </>

                    :
                    <>

                <div className="row new-debate--container-row">
                    <div className="row">
                            <h2 className='
                                new-debate--entry-code  
                                text-center 
                                white-text'
                                >
                                {t("newDebate.entryCode")} {entryCode}
                            </h2>
                        </div>

                    <h1 className='new-debate--motion new-debate--motion--mobile col-12 text-center mt-3 mb-0'>
                    <div className="col-12 new-debate--btn new-debate-btn--mobile new-debate--label text-center font-weight-bold">{t("newDebate.motion")}</div>
                        <hr className='new-debate--line'></hr>
                        {/* Ez egy textfield lesz, hogy at lehessen irni ha arra volna igeny */}
                        <div className="row">
                            
                            
                            {/* <span className="new-debate--motion-text white-text">{motion}</span> */}
                            <div className="row new-debate--motion-text-row">
                            {currRole === 'judge' ?
                            <textarea  type="text" 
                                        ref={ref}
                                        value={motion}
                                        className="new-debate--motion-text col-12" 
                                        onChange={(e) => { setMotion(e.target.value); handleMotion(e.target.value) }}
                                        onFocus={(e) => setFocused(true)}
                                        onBlur={(e) => setFocused(false)}
                                        />
                            :
                            <textarea  type="text" 
                                        ref={ref}
                                        value={motion}
                                        className="new-debate--motion-text col-12" 
                                        disabled
                                        />
                            }
                            </div> 
                        </div>
                        <RandomMotionSetter setMotion={setMotion} currRole={currRole}/>
                        
                    </h1>
                </div>
                {/* Gyakorlatilag ez a container sor */}
                <div className="new-debate--decision row justify-content-evenly">

                    { true ? <>
                    <div
                        className="new-debate--decision--pro new-debate--decision--pro--mobile  new-debate--dec col-12"
                    >
                        <div className="col-12 new-debate--pro-btn new-debate--pro-btn--mobile new-debate--label text-center font-weight-bold">{t("newDebate.government")}</div>
                        <hr className='new-debate--line'></hr>
                        {
                            listerMobile (
                                'pro',
                                posts, 
                                allUsers, 
                                handleChoose,  
                                setCurrRole)
                        }
                    </div>
                    
                    <div
                        className="new-debate--decision--con .new-debate--decision--con--mobile new-debate--dec col-12"
                    >
                        <div className="col-12 new-debate--pro-btn new-debate--pro-btn--mobile text-center new-debate--label font-weight-bold">{t('newDebate.opposition')}</div>
                        <hr className='new-debate--line'></hr>
                        {
                            listerMobile (
                                'con',
                                posts, 
                                allUsers, 
                                handleChoose, 
                                setCurrRole)
                        }
                    </div>
                    <div className="col-12 new-debate--pro-btn new-debate--pro-btn--mobile new-debate--label text-center font-weight-bold">{t("newDebate.spectators")}</div>
                    <hr className='new-debate--line'></hr>
                    <div className="row new-debate--center-spectators-row"> 
                        {
                            spectatorLister(allUsers)
                        }
                        </div>
                     </>   : null
                    }
                </div>

                <div className="new-debate--spectator  row justify-content-evenly">
                    <div 
                        className={"new-debate--spectator-col new-debate--button col-4 white-text text-center" + (currRole === 'judge' ? ' new-debate--selected-button' : '') }
                            onClick={() => { handleChoose('judge', null, setCurrRole); window.scrollTo(0, document.body.scrollHeight); }}
                        >
                        {t("newDebate.judge")}
                        </div>    
                    <div 
                        className={"new-debate--spectator-col new-debate--button col-4 white-text text-center" + (currRole === 'spectator' ? ' new-debate--selected-button' : '') }
                            onClick={() => handleChoose('spectator', null, setCurrRole)}
                        >
                        {t("newDebate.spectator")}
                    </div>
                </div>


                {/* Ez ejsye nem fog kelleni */}
                {/*<div className="new-debate--clear-btn-container row justify-content-center">
                        <div
                            className="col-4 new-debate--button white-text text-center"
                            onClick={() => {
                                if (currRole != null) {
                                    setReady(!ready);
                                } else {
                                }
                            }}
                        >
                            {
                                ready ?
                                <>
                                    not ready
                                </>
                                :
                                <>
                                    ready
                                </>
                            }
                        </div>
                        </div>*/}
                
                {/* ha megvan minden fontos, el lehet inditani a vitat --  de ez sem biztos hogy kell  */}
                <div className="new-debate--start row justify-content-center">
                {
                    (currRole == 'judge' ) ?
                    <>
                        
                            <div
                                className="new-debate--button col-4 white-text text-center"
                                onClick={startDebate}
                            >
                                {t("newDebate.start")}
                            </div>
                        
                    </>
                    : 
                    <>
                         <div
                                className="new-debate--button new-debate--button-disabled col-4 white-text text-center"
                            >
                                {t("newDebate.start")}
                            </div>
                    </>
                }
                </div>
                </>
                }
            </div>
        </div>
    )
}

export default NewDebateMobile
