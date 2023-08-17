import React from 'react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axios';
import { useTranslation } from 'react-i18next'

import './JoinDebate.css';

function ErrorMessage(props) {
  const { t } = useTranslation();
  const { errorState } = props;

  if ( !errorState ) return <></>;

  return (
    <div className="error-message">
      <p>{t("joinDebate.error")}</p>
    </div>
  );
}

function JoinDebate(props) {
    const { t } = useTranslation();
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

        axiosInstance
            .get('debate/current/', {params: {
                "entry-code":debateCode
            }})
            .then((res) => {
                
                props.setInDebate(true);
                props.setTrigger(false);

                if (props.closeMenu) {
                  props.closeMenu();
                }
                setDebateCode("");
                if (res.data.status === 'lobby') {
                  props.setStatus('/new-debate');
                  navigate('/new-debate');
                } else if (res.data.status === 'running') {
                  props.setStatus('/in-debate');
                  navigate('/in-debate');
                } else if (res.data.status === 'finished') {
                  props.setStatus('/finished-debate');
                  navigate('/finished-debate');
                }

                axiosInstance
                  .patch('user/current/', {
                    'role': 'spectator'
                  })
                  .catch((err) => {
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
                <h3 className="join-debate--text white-text">{t("joinDebate.code")} </h3>
                <input
                    type="text"
                    value={debateCode}
                    placeholder=""
                    id="join-debate--code"
                    onChange={(e) => {
                        setDebateCode(e.target.value);
                    }}
                    autoFocus
                />
                <button
                    className="join-debate--next-btn"
                    onClick={handleNext}
                >
                    {t("joinDebate.next")}
                </button>
                <ErrorMessage errorState={errorState} />
                </>
                :
                <h1>{t("joinDebate.notLoggedIn")}</h1>
                }
            </div>
        </div>
    ) : "";
}

export default JoinDebate
