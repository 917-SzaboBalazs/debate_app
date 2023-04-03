import React from 'react'
import { useState, useEffect } from 'react'
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';


import './Results.css'

const checkResults = (results) => {
  return new Promise ((resolve, reject) => {
    if (results.length === new Set(results).size) {
      resolve('Siker');
    } else {
      reject('Duplikátum található');
    }
  })
}

function Results() {
  const navigate = useNavigate();


  const [ results, setResults ] = useState([]);
  const [ selected, setSelected ] = useState('none');
  const [ isJudge, setIsJudge ] = useState(false);

  useEffect(() => {
    const initialValue = [
      'pro1',
      'pro2',
      'con1',
      'con2',
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
        setSelected('pro1');
        break;

      case 1:
        setSelected('pro2');
        break;

      case 2:
        setSelected('con1');
        break;

      case 3:
        setSelected('con2');
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
        <div className=" row d-flex align-align-items-center justify-content-evenly ">
          {/* Selection */}
          <div className="col-4 d-flex align-items-center  justify-content-center flex-column">
            <div 
              id="results--pro1" 
              className="row results--selection"
              onClick = { () => {
                handleSelect(0);
              }}
            >
              <p className="col-12">Pro1</p>
            </div>
            <div 
              id="results--pro2" 
              className="row results--selection"
              onClick = { () => {
                handleSelect(1);
              }}
            >
              <p className="col-12">Pro2</p>
            </div>
            <div 
              id="results--con1" 
              className="row results--selection"
              onClick = { () => {
                handleSelect(2);
              }}
            >
              <p className="col-12">Con1</p>
            </div>
            <div 
              id="results--con2" 
              className="row results--selection"
              onClick = { () => {
                handleSelect(3);
              }}
            >
              <p className="col-12">Con2</p>
            </div>
          </div>
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