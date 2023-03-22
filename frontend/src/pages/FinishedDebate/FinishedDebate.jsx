import React from 'react'
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './FinishedDebate.css'

function FinishedDebate() {
    const [ winnerTeam, setWinnerTeam ] = useState('Nem lehet tudni, az egyik dev elbaszott valamit')
    
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance('debates/current/')
        .then((res) => {
            setWinnerTeam(res.data.winner)
        })
        .catch((err) => {
            console.log(err)
        })
        
    }, []);
    
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

  return (
    <div className='finished-debate--base row d-flex justify-content-center align-items-center'>
        <div className="in-debate--hiba row d-flex justify-content-center align-items-center">
            <h1 className='col-12 text-center'>A {winnerTeam} csapat nyert!</h1>
            <button
                className="in-debate--leave-debate white-text col-4"
                onClick={leaveDebate}
            >
                Leave Debate
            </button>
        </div>
    </div>
  )
}

export default FinishedDebate
