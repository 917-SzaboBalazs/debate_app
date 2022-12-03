// A NEW DEBATE MOBIL VERZIOJA

import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './NewDebate.css';

import axiosInstance from '../../axios';
import handleChoose from './Functions/handleChoose';
import handleMotion from './Functions/handleMotion';
import listerMobile from './Functions/listerMobile';
import getDebateCurrent from './Functions/getDebateCurrent';
import getUserCurrent from './Functions/getUserCurrent';

function NewDebateMobile() {
    const navigate = useNavigate();
    const [ debateType, setDebateType ] = useState(''); // -ez lehet nem fog kelleni most
    const [ entryCode, setEntryCode ] = useState('');
    const [ someError, setSomeError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ motion, setMotion ] = useState();
    const [ newMotion, setNewmotion ] = useState('Set a motion pls'); // a motion setter
    const [ currRole, setCurrRole ] = useState('spectator');
    const [ focused, setFocused ] = useState(false);

    const [ ready, setReady ] = useState(false);
    const [ posts, setPosts ] = useState([]);
    const [ allUsers, setAllUsers] = useState([]);

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

                <div className="row new-debate--container-row">
                    <h1 className='new-debate--motion col-12 text-center mt-3 mb-0'>
                        {/* Ez egy textfield lesz, hogy at lehessen irni ha arra volna igeny */}
                        <div className="row">
                            {/* <span className="new-debate--motion-text white-text">{motion}</span> */}
                            <div className="row new-debate--motion-text-row">
                            <input  type="text" 
                                    className="new-debate--motion-text col-12" 
                                    defaultValue={motion} 
                                    placeholder={motion} 
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => {
                                        handleMotion(newMotion);
                                        setFocused(false);
                                    }}
                                    onChange={(ev) => {setNewmotion(ev.target.value)}}/>
                            </div>    
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
                    </h1>
                </div>
                {/* Gyakorlatilag ez a container sor */}
                <div className="new-debate--decision row justify-content-evenly">

                    { true ? <>
                    <div
                        className="new-debate--decision--pro new-debate--dec col-5"
                    >
                        <div className="col-12 new-debate--pro-btn new-debate--label text-center font-weight-bold">Government</div>
                        <hr className='new-debate--line'></hr>
                        {
                            listerMobile (
                                'pro',
                                posts, 
                                allUsers, 
                                handleChoose, 
                                ready, 
                                setCurrRole)
                        }
                    </div>
                    
                    <div
                        className="new-debate--decision--con new-debate--dec col-5"
                    >
                        <div className="col-12 new-debate--pro-btn text-center new-debate--label font-weight-bold">Opposition</div>
                        <hr className='new-debate--line'></hr>
                        {
                            listerMobile (
                                'con',
                                posts, 
                                allUsers, 
                                handleChoose, 
                                ready, 
                                setCurrRole)
                        }
                    </div>

                    {/* birok nem fognak kelleni */}
                    {/* <div className="new-debate--decision--judge col-sm-3 col-md-3">
                        <div className="col-12 new-debate--pro-btn new-debate--dec text-center  new-debate--label font-weight-bold">BÍRÓ</div>
                        {judgeListed}
                    </div> */}
                     </>   : null
                    }
                </div>

                <div className="new-debate--spectator  row justify-content-evenly">
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
                </div>


                {/* Ez ejsye nem fog kelleni */}
                <div className="new-debate--clear-btn-container row justify-content-center">
                        <div
                            className="col-4 new-debate--button white-text text-center"
                            onClick={() => {
                                if (currRole != null) {
                                    setReady(!ready);
                                } else {
                                    alert('choose a role first');
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
                
                {/* ha megvan minden fontos, el lehet inditani a vitat --  de ez sem biztos hogy kell  */}
                {
                    ready ?//&& ( ( !hasChair && currRole == 'judge1' ) || ( hasChair && currRole == 'judge1 (chair)') )?
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
                </>
                }
            </div>
        </div>
    )
}

export default NewDebateMobile
