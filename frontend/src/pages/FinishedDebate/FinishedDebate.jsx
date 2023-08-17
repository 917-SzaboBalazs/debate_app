import React from 'react'
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './FinishedDebate.css'
import leaveDebate from '../../components/Functions/leaveDebate';

// const ListResult = (props, index) => {
//   const winnerTeam = Object.values(props.res);
//   console.log(winnerTeam)
//   console.log(props.index)
//   // const listItems = winnerTeam.map(elem => 
//   //   <li>{elem}</li>
//   // );

//   switch (winnerTeam[props.index]) {
//     case "OG":
//       return "Opening Government";
//     case "OO":
//       return "Opening Opposition";
//     case "CG":
//       return "Closing Government";
//     case "CO":
//       return "Closing Opposition";
//     default: 
//       return "null";
//   }

//   // return winnerTeam[props.index];
// }

function Ranking(props) {
  const { teams } = props;

  return (
    <div className="finished-debate--ranking">
      { teams.map((team, index) => {
        return(
          <div className="ranking-row" id={(index === 0) ? 'first' : 'not-first'} key={team}>
            <div className="index-container">
            <p>{index + 1}</p>
          </div>
            <p>{team}</p>
          </div>
        )
      })}
    </div>
  )
}

const listFromObj = (obj) => {
  const getAbbreviation = (abb) => {
    switch (abb) {
      case 'OG':
        return 'Opening Government';
      case 'CG':
        return 'Closing Government';
      case 'OO':
        return 'Opening Opposition';
      case 'CO':
        return 'Closing Opposition';
      default:
        return 'Noone';
    }
  }

  const myList = []

  for (let key in obj) {
    myList.push(getAbbreviation(obj[key]));
  }

  return myList;
}

function FinishedDebate({ setInDebate, setStatus }) {
    const [ winnerTeam, setWinnerTeam ] = useState(['Nem lehet tudni, az egyik dev elbaszott valamit']);
    const [ loading, setLoading ] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
        .get('debate/current/')
        .then((res) => {
          const results = JSON.parse(res.data.result);
          setWinnerTeam(listFromObj(results));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        })
        
    }, []);

  if (loading) {
    return <div className='finished-debate--base base d-flex justify-content-center align-items-center'></div>
  }

  return (
    <div className='finished-debate--base base d-flex justify-content-center align-items-center'>
        <div className="finished-debate--container fade-in">
          <h1>Results</h1>
          <Ranking teams={winnerTeam}/>
          <button
              className="in-debate--leave-debate white-text col-4"
              onClick={() => leaveDebate(setInDebate, setStatus, navigate)}
              >
              Leave Debate
          </button>
        </div>
    </div>
  )
}

export default FinishedDebate
