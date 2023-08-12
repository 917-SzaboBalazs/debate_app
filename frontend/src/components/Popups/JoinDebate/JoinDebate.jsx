import React from 'react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axios';

import './JoinDebate.css';

function ErrorMessage(props) {
  const { errorState } = props;

  if ( !errorState ) return <></>;

  return (
    <div className="error-message">
      <p>Invalid code</p>
    </div>
  );
}

function JoinDebate(props) {
    const [ debateCode, setDebateCode ] = useState('');
    const [ errorState, setErrorState ] = useState(false);

    let navigate = useNavigate();

    const handleClose = useCallback((props) => {
      setErrorState(false);
      props.setTrigger(false);
      setDebateCode("");
    }, [setErrorState]);
    
    const handleNext = () => {
        if (debateCode === '') {
            return;
        }

        console.log(debateCode);
        axiosInstance
            .get('debate/current/', {params: {
                "entry-code":debateCode
            }})
            .then((res) => {
                navigate('/new-debate');
                //window.location.reload(false);
                props.setInDebate(true);
                props.setTrigger(false);
                props.closeMenu();
                setDebateCode("");

                axiosInstance
                  .patch('user/current/', {
                    'role': 'spectator'
                  })
                  .catch((err) => {
                    console.log(err);
                  })
            })
            .catch((err) => {
              setErrorState(true);
            })
    }

    return (props.trigger) ? (
        <div className='join-debate'>
            <div className="join-debate--inner">
                <button className="join-debate--close-btn" onClick={() => handleClose(props)}>X</button>
                { props.loggedIn ?
                <>
                <h3 className="join-debate--text white-text">Debate Code: </h3>
                <input
                    type="text"
                    value={debateCode}
                    placeholder='kód'
                    id="join-debate--code"
                    onChange={(e) => {
                        setDebateCode(e.target.value);
                    }}
                />
                <button
                    className="join-debate--next-btn"
                    onClick={handleNext}
                >
                    Next
                </button>
                <ErrorMessage errorState={errorState} />
                </>
                :
                <h1>You have to be logged in first, in order to join a debate.</h1>
                }
            </div>
        </div>
    ) : "";
}

export default JoinDebate
