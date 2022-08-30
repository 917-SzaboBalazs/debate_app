import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './NewDebate.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../axios';
import axios from 'axios';

function NewDebate() {
    // const location = useLocation();
    // const type = location.state.type;
    const navigate = useNavigate();
    const [ debateType, setDebateType ] = useState('');
    const [ entryCode, setEntryCode ] = useState('');
    const [ someError, setSomeError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ noJudges, setNoJudges ] = useState(1);
    const [ motion, setMotion ] = useState('');
    const [ currRole, setCurrRole ] = useState('spectator');

    const [ ready, setReady ] = useState(false);
    const [ posts, setPosts ] = useState(['1', '2', '3', '4']);
    const [ postJudge, setJudge ] = useState(['1', '2', '3', '4', '5']);

    const [ waitValue, setWaitValue ] = useState(false);

    useEffect(() => {

        const interval = setInterval(() => {
            
        axiosInstance
            .get('debate/current/')
            .then((res) => {
                // console.log(res);
                setSomeError(false);
                setErrorMessage('');
                setDebateType(res.data.type);
                setEntryCode(res.data.entry_code);
                setNoJudges(res.data.no_judges);
                setMotion(res.data.motion);
                setJudge(postJudge.slice(0, noJudges));
                setWaitValue(true);
                if (res.data.status != 'lobby') {
                    navigate('/in-debate');
                }
            })
            .catch((err) => {
                setSomeError(true);
                if (err.response.status === 401) {
                    console.log('Valaki nincs bejelentkezve');
                    setErrorMessage('Jelentkezz be rigó');
                } else if (err.response.status === 404) {
                    console.log('Valaki vitátlan');
                    setErrorMessage('Lépj be egy vitába előbb, s utána keménykedj');
                }
                else {
                    console.log('Nagy a baj');
                    setErrorMessage('Valamit nagyon elcsűrtél');
                }
            });
        
        }, 2000)
        return () => {clearInterval(interval)};
    }, []);   
    
    useEffect(() => {
        axiosInstance
        .get('user/current/')
        .then((res) => {
            setCurrRole(res.data.role);
        })
    }, [currRole]);


    function handleChoose(team, nr) {

        if (!ready) {
            let role = team + nr;
            console.log(role);

            axiosInstance
                .get('user/role/', {params:{'role':role}})
                .then(() => {
                    console.log('nemjo');
                    alert(role + 'is already chosen')
                })
                .catch(() => {
                    console.log('jojo');
                    setCurrRole(role);
                    axiosInstance
                    .patch('user/current/', {'role':role})
                    .then((res) => {
                        // console.log('nice');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                })
        } else {
            alert('You must not be ready in order to change role.');
        }
    }

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

    const proListed = posts.map((player) => 
        <div className="col-2 new-debate--participant" onClick={event => handleChoose('pro', player)} key={player}>
            {player}
        </div> 
    )
    const conListed = posts.map((player) =>
        <div className="col-2 new-debate--participant" onClick={event => handleChoose('con', player)} key={player}>
            {player}
        </div>
    )
    const judgeListed = postJudge.map((player) =>
        <div className="col-2 new-debate--participant" onClick={event => handleChoose('judge', player)} key={player}>
            {player}
        </div>
    )

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
                
                <div className="row">
                    <h1 className='new-debate--motion col-12 text-center p-4'><span className="new-debate--motion-text white-text">"{motion}"</span></h1>
                </div>
                <div className="row pt-4">
                    <h2 className='new-debate--basic-text col-md-6 col-sm-12 text-center white-text'>Debate-type: {debateType}</h2>
                    <h2 className='new-debate--current-role col-md-6 col-sm-12 text-center white-text'>Your role: {currRole}</h2>
                </div>
                <div className="row">
                    <h2 className='new-debate--ready col-md-6 col-sm-12 text-center white-text'>Ready: {ready ? 'true' : 'false'}</h2>
                    <h2 className='new-debate--entry-code col-md-6 col-sm-12 text-center white-text'>Entry: {entryCode}</h2>
                </div>

                <div className="new-debate--procon-row row pt-2 justify-content-around">
                </div>
                <div className="new-debate--decision row justify-content-evenly">
                    { waitValue ? <>
                    <div 
                        className="new-debate--decision--pro new-debate--dec col-sm-3 col-md-3"
                    >
                        <div className="col-12 new-debate--pro-btn new-debate--label text-center font-weight-bold">PRO</div>
                        {proListed}
                    </div>
                    <div 
                        className="new-debate--decision--con new-debate--dec col-sm-3 col-md-3"
                    >
                        <div className="col-12 new-debate--pro-btn text-center new-debate--label font-weight-bold">CON</div>
                        {conListed}
                    </div>
                    <div className="new-debate--decision--judge col-sm-3 col-md-3">
                        <div className="col-12 new-debate--pro-btn new-debate--dec text-center  new-debate--label font-weight-bold">JUDGE</div>
                        {judgeListed}
                    </div>
                     </>   : null
                    }
                </div>
                
                <div className="new-debate--spectator  row justify-content-center">
                    <div className="new-debate--spectator-col new-debate--button col-4 white-text text-center" onClick={event => handleChoose('spectator', '')}>
                        Spectator
                    </div>
                </div>

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
                {
                    ready && currRole == 'judge1' ? 
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

export default NewDebate