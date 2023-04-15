import React from 'react'
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './FinishedDebate.css'

const ListResult = (props, index) => {
  const winnerTeam = Object.values(props.res);
  console.log(winnerTeam)
  console.log(props.index)
  // const listItems = winnerTeam.map(elem => 
  //   <li>{elem}</li>
  // );

  return winnerTeam[props.index];
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
        <div className="finished-debate--hiba row d-flex justify-content-evenly">
          <div id="p1st" class='place--finished'>
            <p><ListResult res={winnerTeam} index={0}/></p>
            <div className="take-place--results">First</div>  
          </div>
          <div id="p2nd" class='place--finished'>
            <p><ListResult res={winnerTeam} index={1}/></p>
            <div className="take-place--results">Second</div>  
          </div>
          <div id="p3rd" class='place--finished'>
            <p><ListResult res={winnerTeam} index={2}/></p>
            <div className="take-place--results">Third</div>  
          </div>
          <div id="p4th" class='place--finished'>
              <p><ListResult res={winnerTeam} index={3}/></p>
              <div className="take-place--results">Fourth</div>  
          </div>
            {/* <ol className="col-12 d-flex flex-column align-items-center"><ListResult res={winnerTeam} /></ol> */}
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
