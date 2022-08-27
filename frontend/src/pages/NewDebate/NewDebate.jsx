import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './NewDebate.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../axios';

function NewDebate() {
    // const location = useLocation();
    // const type = location.state.type;
    const [ debateType, setDebateType ] = useState('');
    const [ entryCode, setEntryCode ] = useState('');
    const [ someError, setSomeError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ noJudges, setNoJudges ] = useState(3);
    const [ currRole, setCurrRole ] = useState('spectator');

    useEffect(() => {
        axiosInstance
            .get('debate/current/')
            .then((res) => {
                console.log(res);
                setSomeError(false);
                setErrorMessage('');
                setDebateType(res.data.type);
                setEntryCode(res.data.entry_code);
                setNoJudges(res.data.no_judges);
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
        

    }, []);

    useEffect(() => {
        axiosInstance
        .get('user/current/')
        .then((res) => {
            setCurrRole(res.data.role);
        })
    }, [currRole])

    const [ ready, setReady ] = useState(false);
    const [ posts, setPosts ] = useState(['1', '2', '3', '4']);
    const [ postJudge, setJudge ] = useState(['1', '2', '3']);


    function handleChoose(team, nr) {

        if (!ready) {
            let role = team + nr;
            console.log(role);
            setCurrRole(role);

            axiosInstance
                .patch('user/current/', {'role':role})
                .then((res) => {
                    console.log('nice');
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert('You must not be ready in order to change role.');
        }
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
                
                <div className="row pt-4">
                    <h2 className='new-debate--basic-text col-md-6 col-sm-12 text-center white-text'>Debate-type: {debateType}</h2>
                    <h2 className='new-debate--current-role col-md-6 col-sm-12 text-center white-text'>Your role: {currRole}</h2>
                </div>
                <div className="row">
                    <h2 className='new-debate--ready col-md-6 col-sm-12 text-center white-text'>Ready: {ready ? 'true' : 'false'}</h2>
                    <h2 className='new-debate--entry-code col-md-6 col-sm-12 text-center white-text'>Entry: {entryCode}</h2>
                </div>

                <div className="new-debate--procon-row row pt-2 justify-content-around">
                <div className="col-2 new-debate--pro-btn text-center font-weight-bold">PRO</div>
                <div className="col-2 new-debate--pro-btn text-center font-weight-bold">CON</div>
                <div className="col-2 new-debate--pro-btn text-center font-weight-bold">JUDGE</div>
                </div>
                <div className="new-debate--decision row justify-content-evenly">
                    <div 
                        className="new-debate--decision--pro col-sm-3 col-md-3"
                    >
                        {proListed}
                    </div>
                    <div 
                        className="new-debate--decision--con col-sm-3 col-md-3"
                    >
                        {conListed}
                    </div>
                    <div className="new-debate--decision--judge col-sm-3 col-md-3">
                        {judgeListed}
                    </div>
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
                                setReady(!ready);
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
                </>
                }
            </div>
        </div>
    )
}

export default NewDebate