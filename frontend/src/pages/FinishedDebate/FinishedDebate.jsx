import React from 'react'
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './FinishedDebate.css'

const ListResult = (props) => {
  const winnerTeam = Object.values(props.res);
  const listItems = winnerTeam.map(elem => 
    <li>{elem}</li>
  );

  return listItems;
}

function FinishedDebate() {
    const [ winnerTeam, setWinnerTeam ] = useState(['Nem lehet tudni, az egyik dev elbaszott valamit'])
    
    const navigate = useNavigate();

    

    useEffect(() => {
        axiosInstance
        .get('debate/current/')
        .then((res) => {
          // console.log(res.data);
          const results = JSON.parse(res.data.result);
          setWinnerTeam(results);
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
        <div className="finished-debate--hiba row d-flex justify-content-evenly align-items-center">
            <ol className="col-12 d-flex flex-column align-items-center"><ListResult res={winnerTeam} /></ol>
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
