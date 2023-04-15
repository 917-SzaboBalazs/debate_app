import React from 'react'
import { useState, useEffect } from 'react'
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';


import './Results.css'

const checkResults = (results) => {
  return new Promise ((resolve, reject) => {
    const str = JSON.stringify(results);

    if(!str.includes("OG")){
      reject("OG is not in the list")
    }
    if(!str.includes("CG")){
      reject("CG is not in the list")
    }
    if(!str.includes("OO")){
      reject("OO is not in the list")
    }
    if(!str.includes("CO")){
      reject("CO is not in the list")
    }

    resolve("Siker")

    // if (results.length === new Set(results).size) {
    //   resolve('Siker');
    // } else {
    //   reject('Duplikátum található');
    // }
  })
}

function Results() {
  const navigate = useNavigate();


  const [ results, setResults ] = useState([]);
  const [ selected, setSelected ] = useState('none');
  const [ isJudge, setIsJudge ] = useState(false);

  useEffect(() => {
    const initialValue = [
      '1st',
      '2nd',
      '3rd',
      '4th',
    ];

    setResults(initialValue);

    axiosInstance
      .get('user/current/')
      .then((res) => {
        if (res.data.role === 'judge') {
          setIsJudge(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelect = (option) => {
    switch (option) {
      case 0:
        setSelected('OG');
        break;

      case 1:
        setSelected('CG');
        break;

      case 2:
        setSelected('OO');
        break;

      case 3:
        setSelected('CO');
        break;

      default:
        break;
    }
  } 

  const handleRes = (index) => {
    selected === 'none' ?
              alert('Select something') :
              setResults(prev => prev.map((element, i) => {
                if (i === index) {
                  return selected;
                } else {
                  return element;
                }
              }))
  }

  const diffBackground = (element) => {
    const team1 = document.getElementById('results--pro1');
    const team2 = document.getElementById('results--pro2');
    const team3 = document.getElementById('results--con1');
    const team4 = document.getElementById('results--con2');

    team1.style.backgroundColor = 'whitesmoke';
    team2.style.backgroundColor = 'whitesmoke';
    team3.style.backgroundColor = 'whitesmoke';
    team4.style.backgroundColor = 'whitesmoke';

    const selected = document.getElementById(element);
    selected.style.backgroundColor = 'orange';
  }

  const handleSubmit = () => {
    checkResults(results)
      .then(() => {
        axiosInstance
            .patch('debate/current/', {'result':JSON.stringify(Object.assign({}, results)), 'status':'finished'})
            .then((res) => {
              navigate('/finished-debate');
            })
            .catch((err) => {
                console.log(err);
            })
      })
      .catch((err) => {
        alert(err);
      })
  }

  return (
    <>
    {
      isJudge ?
    <div className="results--container row d-flex align-items-center justify-content-evenly flex-column">
      <div className="row results--selected-text d-flex justify-content-center">
        selected: {selected}
      </div>
      <div className="row">
        <div className=" row d-flex align-align-items-center justify-content-evenly " id="col-holder--results">
          {/* Results */}
          <div className="col-4 d-flex align-items-center  justify-content-center flex-column">
            <div 
              id="results--first" 
              className="row results--results"
              onClick={ () => {
                  handleRes(0);
                }
              }
            >
              <div className="col-12"><p>{results[0]}</p></div>
            </div>
            <div 
              id="results--second" 
              className="row results--results"
              onClick={ () => {
                  handleRes(1);
                }
              }
            >
              <div className="col-12"><p>{results[1]}</p></div>
            </div>
            <div 
              id="results--third" 
              className="row results--results"
              onClick={ () => {
                  handleRes(2);
                }
              }
            >
              <div className="col-12"><p>{results[2]}</p></div>
            </div>
            <div 
              id="results--forth" 
              className="row results--results"
              onClick={ () => {
                  handleRes(3);
                }
              }
            >
              <div className="col-12"><p>{results[3]}</p></div>
            </div>
          </div>
          {/* Selection */}
          <div className="col-4 d-flex align-items-center  justify-content-center flex-column" id="teams-holder--results">
            <div 
              id="results--pro1" 
              className="row results--selection"
              onClick = { () => {
                handleSelect(0);
                diffBackground('results--pro1');
              }}
            >
              <p className="col-12">OG</p>
            </div>
            <div 
              id="results--pro2" 
              className="row results--selection"
              onClick = { () => {
                handleSelect(1);
                diffBackground('results--pro2');
              }}
            >
              <p className="col-12">CG</p>
            </div>
            <div 
              id="results--con1" 
              className="row results--selection"
              onClick = { () => {
                handleSelect(2);
                diffBackground('results--con1');
              }}
            >
              <p className="col-12">OO</p>
            </div>
            <div 
              id="results--con2" 
              className="row results--selection"
              onClick = { () => {
                handleSelect(3);
                diffBackground('results--con2');
              }}
            >
              <p className="col-12">CO</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row results--submit">
        <button 
          className="results--submit-button"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
    :
    <></>
        }
    </>
  )
}

export default Results