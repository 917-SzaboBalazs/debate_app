import React from 'react'
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './FinishedDebate.css'

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

function FinishedDebate({ setInDebate }) {
    const [ winnerTeam, setWinnerTeam ] = useState(['Nem lehet tudni, az egyik dev elbaszott valamit'])
    
    const navigate = useNavigate();

    console.log(winnerTeam);

    useEffect(() => {
        axiosInstance
        .get('debate/current/')
        .then((res) => {
          // console.log(res.data);
          const results = JSON.parse(res.data.result);
          setWinnerTeam(listFromObj(results));
        })
        .catch((err) => {
            console.log(err)
        })
        
    }, []);
    
    const leaveDebate = () => {
        axiosInstance
            .patch('user/current/', {"current_debate": null, 'role': null})
            .then((res) => {
                setInDebate(false);
                navigate('/');
                
            })
            .catch((err) => {
            })
    }

  return (
    <div className='finished-debate--base base d-flex justify-content-center align-items-center'>
        <div className="finished-debate--container">
          <h1>Results</h1>
          <Ranking teams={winnerTeam}/>
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
