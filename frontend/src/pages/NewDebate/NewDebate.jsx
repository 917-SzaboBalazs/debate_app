// A NEW DEBATE ASZTALI VERZIOJA

import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import handleChoose from './Functions/handleChoose';
import handleMotion from './Functions/handleMotion';
import getDebateCurrent from './Functions/getDebateCurrent';
import getUserCurrent from './Functions/getUserCurrent';
import listerDesktop from './Functions/listerDesktop';
import axiosInstance from '../../axios';
import RandomMotionSetter from './Components/randomMotionSetter';
import spectatorLister from './Functions/spectatorLister';
import LoginPopup from '../../components/Popups/NotReady/NotReady';
import NotReady from '../../components/Popups/NotReady/NotReady';


function NewDebate() {
    // const location = useLocation();
    // const type = location.state.type;
    const navigate = useNavigate();
    const [ debateType, setDebateType ] = useState(''); // -ez lehet nem fog kelleni most
    const [ entryCode, setEntryCode ] = useState('');
    const [ someError, setSomeError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ motion, setMotion ] = useState("");
    const [ currRole, setCurrRole ] = useState('spectator');

    const [ focused, setFocused ] = useState(false);

    const [ ready, setReady ] = useState(false);
    const [ posts, setPosts ] = useState([]);
    const [ allUsers, setAllUsers] = useState([]);

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
    }, [focused]);

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
        <div className='new-debate--background base'>
            <div className="new-debate--container container">
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

                {/* Gyakorlatilag ez a container sor */}
                <div className="new-debate--decision row justify-content-evenly">

                    { true ? <>
                    <div
                        className="new-debate--decision--pro new-debate--dec col-3"
                    >
                        <div className="col-12 new-debate--pro-btn new-debate--label text-center font-weight-bold">Government</div>
                        <hr className='new-debate--line'></hr>
                        {
                            listerDesktop (
                                'pro',
                                posts, 
                                allUsers, 
                                handleChoose, 
                                ready, 
                                setCurrRole)
                        }
                    </div>

                    {/* Itt van a kozepso sor*/}
                    <div className='new-debate--motion col-6 text-center p-4'>
                        {/* Ez egy textfield lesz, hogy at lehessen irni ha arra volna igeny */}
                        <div className="row">
                            <div className="row">
                                <textarea  type="text" 
                                        ref={ref}
                                        value={motion}
                                        className="new-debate--motion-text col-12" 
                                        onChange={(e) => { setMotion(e.target.value); handleMotion(e.target.value) }}
                                        onFocus={(e) => setFocused(true)}
                                        onBlur={(e) => setFocused(false)}
                                        />
                            </div>
                            <RandomMotionSetter setMotion={setMotion} />
                        </div>
                        <div className="row">
                            <h2 className='
                                new-debate--entry-code  
                                text-center 
                                white-text'
                                >
                                {entryCode}
                            </h2>
                        </div>

                        {/* ide jon most a NEXT, setDebateType, spectator gomb */}
                        <div className="row new-debate--spacemaker"></div>
                        <div className="row new-debate--selectDebate">SELECT TYPE: </div>
                        <div className="row new-debate--start"> 
                            {/* ha megvan minden fontos, el lehet inditani a vitat --  de ez sem biztos hogy kell  */}
                            {
                                ready  && ( ( currRole == 'judge' ) )?
                                <>
                                    <div className="new-debate--start row justify-content-center">
                                        <div
                                            className="new-debate--button col-4 white-text text-center"
                                            onClick={startDebate}
                                        >
                                            start
                                        </div>
                                    </div>
                                </>
                                : null
                            }
                        </div>
                        <div className="row new-debate--judge--spectator justify-content-evenly"> 
                            <div 
                                className="
                                    new-debate--spectator-col 
                                    new-debate--button 
                                    col-3 white-text 
                                    text-center" 
                                    onClick={() => handleChoose('judge', null, ready, setCurrRole)}
                                >
                                judge
                            </div>    
                            <div 
                                className="
                                    new-debate--spectator-col 
                                    new-debate--button 
                                    col-3 white-text 
                                    text-center" 
                                    onClick={() => handleChoose('spectator', null, ready, setCurrRole)}
                                >
                                spectator
                            </div>
                            <div
                                className="col-3 new-debate--button white-text text-center"
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
                        </div>
                        {/* <div className="row">Ide be kene tenni a birot, az fasza lenne sztem (vagyis legalulra)</div> */}
                        <div className="row new-debate--center-spectators-row"> 
                        {
                            spectatorLister(allUsers)
                        }
                        </div>
                    </div>
                    <div
                        className="new-debate--decision--con new-debate--dec col-3"
                    >
                        <div className="col-12 new-debate--pro-btn text-center new-debate--label font-weight-bold">Opposition</div>
                        <hr className='new-debate--line'></hr>
                        {
                            listerDesktop (
                                'con',
                                posts, 
                                allUsers, 
                                handleChoose, 
                                ready, 
                                setCurrRole)
                        }
                    </div>

                     </>   : null
                    }
                </div>
                
                </>
                }
            </div>
        </div>
    )
}

export default NewDebate
