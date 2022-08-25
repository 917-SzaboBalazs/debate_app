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

   

    useEffect(() => {
        axiosInstance
            .get('debate/current/')
            .then((res) => {
                console.log(res);
                setSomeError(false);
                setErrorMessage('');
                setDebateType(res.data.type);
                setEntryCode(res.data.entry_code);
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

    const numberOfPeople = 8;
    const [ currentNumberOfPeople, setCurrentNumberOfPeople ] = useState(0); 
    const [ names, setNames ] = useState(['elso', 'masodik', 'harmadik', 'negyedik', 'otodik', 'hatodik', 'hetedik', 'nyolcadik']);
    const [ proPlayers, setProPlayers ] = useState([]);
    const [ conPlayers, setConPlayers ] = useState([]);
    const [ judges, setJudges ] = useState([]);
    const [ chosenName, setChosenName ] = useState('');
    const [ ready, setReady ] = useState(false);

    const namesListed = names.map((name) => {
        return chosenName === name ? 
            <div
                className="new-debate--person col-2 bg-secondary" 
                key={name} 
                onClick={() => {
                    setChosenName(name);
                }}
             >
            {name}
            </div>
            :
            <div 
                className="new-debate--person col-2" 
                key={name} 
                onClick={() => {
                    setChosenName(name);
                }}
            >
                {name}
            </div>
        }
    );

    const proListed = proPlayers.map((player) =>
        <div className="col-2" key={player}>
            {player}
        </div>
    )
    const conListed = conPlayers.map((player) =>
        <div className="col-2" key={player}>
            {player}
        </div>
    )
    const judgeListed = judges.map((player) =>
        <div className="col-2" key={player}>
            {player}
        </div>
    )

    const checkIfReady = () => {
        if ( currentNumberOfPeople === numberOfPeople - 1) {
            setReady(true);
        }
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
                
                <div className="row pt-4">
                    <h2 className='new-debate--basic-text col-12 text-center white-text'>Debate-type: {debateType}</h2>
                    <h2 className='new-debate--entry-code col-12 text-center white-text'>Entry: {entryCode}</h2>
                </div>

                {/* <div className="new-debate--people row justify-content-evenly">
                    {namesListed}
                </div> */}

                <div className="new-debate--procon-row row pt-2 justify-content-evenly">
                    <div className="col-2 new-debate--pro-btn text-center font-weight-bold"
                         onClick = { () => {
                            if (chosenName === '' ) {
                                alert('Please select a player.');
                            } else if (proPlayers.includes(chosenName) || conPlayers.includes(chosenName)) {
                                alert(chosenName + ' has already been selected.');
                            } else if (proPlayers.length === 4 ) {
                                alert('The PRO team is already full');
                            } else {
                                const temp = proPlayers.concat(chosenName);
                                setProPlayers(temp);
                                setCurrentNumberOfPeople(currentNumberOfPeople + 1);

                                const newNames = names.filter(name => name !== chosenName);
                                setNames(newNames);

                                checkIfReady();
                            }
                        }}
                        >PRO</div>
                    <div className="col-2 new-debate--con-btn text-center font-weight-bold"
                         onClick = { () => {
                            if (chosenName === '' ) {
                                alert('Please select a player.');
                            } else if (conPlayers.includes(chosenName) || proPlayers.includes(chosenName)) {
                                alert(chosenName + ' has already been selected.');
                            } else if (conPlayers.length === 4 ) {
                                alert('The Con team is already full');
                            } else {
                                const temp = conPlayers.concat(chosenName);
                                setConPlayers(temp);
                                setCurrentNumberOfPeople(currentNumberOfPeople + 1);

                                const newNames = names.filter(name => name !== chosenName);
                                setNames(newNames);

                                checkIfReady();
                            }
                        }}
                         >CON</div>

                    <div className="col-2 new-debate--judge-btn text-center font-weight-bold"
                         onClick = { () => {
                            if (chosenName === '' ) {
                                alert('Please select a player.');
                            } else if (judges.includes(chosenName) || judges.includes(chosenName)) {
                                alert(chosenName + ' has already been selected.');
                            } else {
                                var temp = judges.concat(chosenName);
                                setJudges(temp);
                                setCurrentNumberOfPeople(currentNumberOfPeople + 1);

                                const newNames = names.filter(name => name !== chosenName);
                                setNames(newNames);

                                checkIfReady();
                            }
                        }}
                         >JUDGE</div>
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
                
                <div className="new-debate--clear-btn-container col-ms-12 text-center">
                        <button 
                            className="new-debate--clear-btn-container--btn"
                            onClick={() => {
                                const newNames = names.concat(proPlayers, conPlayers, judges);
                                setNames(newNames);
                                setProPlayers([]);
                                setConPlayers([]);
                                setJudges([]);
                                setCurrentNumberOfPeople(0);
                                setReady(false);
                            }}
                        >
                            Clear
                        </button>
                </div>

                <div className="new-debate--teams row justify-content-evenly">
                    {}
                </div>

                <div className="new-debate--next_btn_section row justify-content-evenly">
                    {ready && 
                        <button className="new-debate--next-btn pb-3">
                            NEXT
                        </button>
                    }
                </div>
                </>
                }
            </div>
        </div>
    )
}

export default NewDebate