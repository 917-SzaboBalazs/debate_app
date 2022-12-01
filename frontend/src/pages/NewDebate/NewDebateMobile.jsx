// A NEW DEBATE MOBIL VERZIOJA

import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './NewDebate.css';

import axiosInstance from '../../axios';
import handleChoose from './Functions/handleChoose';
import handleMotion from './Functions/handleMotion';

import face1 from '../../images/faces/face1.svg';

function NewDebateMobile() {
    // const location = useLocation();
    // const type = location.state.type;
    const navigate = useNavigate();
    const [ debateType, setDebateType ] = useState(''); // -ez lehet nem fog kelleni most
    const [ entryCode, setEntryCode ] = useState('');
    const [ someError, setSomeError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ noJudges, setNoJudges ] = useState(1); // szerintem ez sem
    const [ motion, setMotion ] = useState('default mo');
    const [ currRole, setCurrRole ] = useState('spectator');

    const [ ready, setReady ] = useState(false);
    const [ posts, setPosts ] = useState([]);
    const [ allUsers, setAllUsers] = useState([]);

    useEffect(() => {
  
          axiosInstance
          .get('user/current/')
          .then((res) => {
              setCurrRole(res.data.role);
          })
  
          const interval = setInterval(() => {
  
          axiosInstance
              .get('debate/current/')
              .then((res) => {
                    console.log(res);
                  setSomeError(false);
                  setErrorMessage('');
                  setDebateType(res.data.type);
                  setAllUsers(res.data.participants);
                  setEntryCode(res.data.entry_code);
                  if (res.data.motion != null) {
                      setMotion(res.data.motion);
                      console.log(res.data.motion)
                  }
                  setPosts(setDebaterArray(4));
                  if (res.data.status != 'lobby') {
                      navigate('/in-debate');
                  }
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
  
              axiosInstance
                .get("user/all-from-current-debate/")
                .then((res) => {
                  setAllUsers(res.data);
                })
                .catch((err) => {
                  console.log(err);
                })
  
  
          }, 500)
  
          return () => {clearInterval(interval)};
      }, []);


    function setDebaterArray(teamSize)
    {
        const debaterArr = [];

        for (let i = 1; i <= teamSize; i++)
        {
            debaterArr.push(i)
        }

        return debaterArr;
    }

    // const handleMotion = () => {
    //     console.log(motion);
    //     axiosInstance
    //         .patch('debate/current/', {'motion': motion })
    //         .then((res) => {
    //             console.log(res);
    //             }
    //         )
    //         .catch((err) => {
    //             console.log(err);
    //             }
    //         )

    // }

    // hozza kell meg adjam a motiont
    const startDebate = () => {
        axiosInstance
            .patch('debate/current/', {'status': 'running'})
            .then((res) => {
                console.log('The debate is running.');
                navigate('/in-debate');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const proListed = posts.map((player) => {
      let role = 'pro' + player;
      let user = allUsers.find(user => user.role == role);
      let username = user == undefined ? "" : user.username;

      // megadom a roleok nevet
      let label_to_print;
      switch(player) {
        case 1: label_to_print = "Prime Minister"; break;
        case 2: label_to_print = "Deputy Prime Minister"; break;
        case 3: label_to_print = "Member of The Government"; break;
        case 4: label_to_print = "Government Whip"; break;
      }

      // ez az ami kilistazza a formakat, tehat itt lehet editelni a "nevkartyakat"
      return (
        // egy sort terit vissza amiben van 2 sor
        <>
        <div className="
            new-debate--card
            row
            justify-content-center
            align-items-center
            "
            onClick={event => handleChoose('pro', player, ready, setCurrRole)} key={player}
            >
            <div className="row">
                <div className="
                    col-12
                    text-center
                    new-debate--card--label
                    "
                >
                    {label_to_print}
                </div>
            </div>
            <div className="row new-debate--card--participant" >
                {/* Ide jon a kep */}
                <div className="col-12 new-debate--card--participant--img">
                    <img src={face1} className="new-debate--card--picture"  />
                </div>
                {/* Ide jon a username */}
                <div className='
                    col-12
                    new-debate--card--participant--name
                    text-center
                    d-flex
                    justify-content-center
                    align-items-center
                    '
                    >
                        {username}
                </div>
            </div>
        </div>
        {
            (player == 2) ?  <br></br>: null
        }
        </>
      )
    }

    )
    const conListed = posts.map((player) => {
      let role = 'con' + player;
      let user = allUsers.find(user => user.role == role);
      let username = user == undefined ? "" :  user.username;

      // megadom a roleok nevet
      let label_to_print;
      switch(player) {
        case 1: label_to_print = "Leader of The Opposition"; break;
        case 2: label_to_print = "Deputy Leader of The Opposition"; break;
        case 3: label_to_print = "Member of Opposition"; break;
        case 4: label_to_print = "Opposition Whip"; break;
      }

      // ez az ami kilistazza a formakat, tehat itt lehet editelni a "nevkartyakat"
      return (

        // egy sort terit vissza amiben van 2 sor
        <>
        <div className="
            new-debate--card
            row
            justify-content-center
            align-items-center
            "
            onClick={event => handleChoose('con', player, ready, setCurrRole)} key={player}
            >
            <div className="row">
                <div className="
                    col-12
                    text-center
                    new-debate--card--label
                    "
                >
                    {label_to_print}
                </div>
            </div>
            <div className="row new-debate--card--participant" >
                {/* Ide jon a kep */}
                <div className="col-12 new-debate--card--participant--img">
                    <img src={face1} className="new-debate--card--picture"  />
                </div>
                {/* Ide jon a username */}
                <div className='
                    col-12
                    new-debate--card--participant--name
                    text-center
                    d-flex
                    justify-content-center
                    align-items-center
                    '
                    >
                        {username}
                </div>
            </div>
        </div>
        {
            (player == 2) ?  <br></br>: null
        }
        </>
      )
    })

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

                <div className="row new-debate--container-row">
                    <h1 className='new-debate--motion col-12 text-center mt-3 mb-0'>
                        {/* Ez egy textfield lesz, hogy at lehessen irni ha arra volna igeny */}
                        <div className="row">
                            {/* <span className="new-debate--motion-text white-text">{motion}</span> */}
                            <div className="row new-debate--motion-text-row">
                                <input  type="text" 
                                        className="new-debate--motion-text col-12" 
                                        placeholder='--' 
                                        onChange={(ev) => {setMotion(ev.target.value)}}/>
                            </div>
                            <div className="row new-debate--motion-set-row">
                            <div 
                                className="new-debate--motion-set col-12"
                                onClick={() => handleMotion(motion)}>set</div>
                            </div>
                        </div>
                        <div className="row">
                            <h2 className='
                                new-debate--entry-code  
                                text-center 
                                white-text'
                                >
                                {entryCode}
                            </h2>
                        </div>
                    </h1>
                </div>
                {/* Gyakorlatilag ez a container sor */}
                <div className="new-debate--decision row justify-content-evenly">

                    { true ? <>
                    <div
                        className="new-debate--decision--pro new-debate--dec col-5"
                    >
                        <div className="col-12 new-debate--pro-btn new-debate--label text-center font-weight-bold">Government</div>
                        <hr className='new-debate--line'></hr>
                        {proListed}
                    </div>
                    
                    <div
                        className="new-debate--decision--con new-debate--dec col-5"
                    >
                        <div className="col-12 new-debate--pro-btn text-center new-debate--label font-weight-bold">Opposition</div>
                        <hr className='new-debate--line'></hr>
                        {conListed}
                    </div>

                    {/* birok nem fognak kelleni */}
                    {/* <div className="new-debate--decision--judge col-sm-3 col-md-3">
                        <div className="col-12 new-debate--pro-btn new-debate--dec text-center  new-debate--label font-weight-bold">BÍRÓ</div>
                        {judgeListed}
                    </div> */}
                     </>   : null
                    }
                </div>

                <div className="new-debate--spectator  row justify-content-evenly">
                    <div 
                                className="
                                    new-debate--spectator-col 
                                    new-debate--button 
                                    col-3 white-text 
                                    text-center" 
                                    onClick={() => handleChoose('judge', null, ready, setCurrRole)}
                                >
                                judge
                            </div>    
                    <div 
                        className="
                            new-debate--spectator-col 
                            new-debate--button 
                            col-3 white-text 
                            text-center" 
                            onClick={() => handleChoose('spectator', null, ready, setCurrRole)}
                        >
                        spectator
                    </div>
                </div>


                {/* Ez ejsye nem fog kelleni */}
                <div className="new-debate--clear-btn-container row justify-content-center">
                        <div
                            className="col-4 new-debate--button white-text text-center"
                            onClick={() => {
                                if (currRole != null) {
                                    setReady(!ready);
                                } else {
                                    alert('choose a role first');
                                }
                            }}
                        >
                            {
                                ready ?
                                <>
                                    not ready
                                </>
                                :
                                <>
                                    ready
                                </>
                            }
                        </div>
                </div>
                
                {/* ha megvan minden fontos, el lehet inditani a vitat --  de ez sem biztos hogy kell  */}
                {
                    ready ?//&& ( ( !hasChair && currRole == 'judge1' ) || ( hasChair && currRole == 'judge1 (chair)') )?
                    <>
                        <div className="new-debate--start row justify-content-center">
                            <div
                                className="new-debate--button col-4 white-text text-center"
                                onClick={startDebate}
                            >
                                start
                            </div>
                        </div>
                    </>
                    : null
                }
                </>
                }
            </div>
        </div>
    )
}

export default NewDebateMobile
