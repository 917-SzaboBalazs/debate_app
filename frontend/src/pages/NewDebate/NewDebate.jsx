// A NEW DEBATE ASZTALI VERZIOJA

import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import './NewDebate.css';
import axiosInstance from '../../axios';

import face1 from '../../images/faces/face1.svg';

function NewDebate() {
    // const location = useLocation();
    // const type = location.state.type;
    const navigate = useNavigate();
    const [ debateType, setDebateType ] = useState(''); // -ez lehet nem fog kelleni most
    const [ entryCode, setEntryCode ] = useState('');
    const [ someError, setSomeError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ noJudges, setNoJudges ] = useState(1); // szerintem ez sem
    const [ motion, setMotion ] = useState('Motion');
    const [ currRole, setCurrRole ] = useState('spectator');

    const [ ready, setReady ] = useState(false);
    const [ posts, setPosts ] = useState([]);
    const [ postJudge, setJudge ] = useState([]);
    const [ hasChair, setHasChair ] = useState(false);
    const [ waitValue, setWaitValue ] = useState(false);
    const [ allUsers, setAllUsers] = useState([]);

    // const [ size, setSize ] = useState(this.resize.bind(this));

    // winSize();

    // const winSize = (() => {
    //     window.addEventListener("resize", this.resize.bind(this))
    //     this.resize()
    // })

    // const resize = (() =>{
    //     this.setState({innerWidth: window.innerWidth})
    // })

    useEffect(() => {

      axiosInstance
        .get("user/all-from-current-debate/")
        .then((res) => {
          setAllUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        })

        axiosInstance
        .get('user/current/')
        .then((res) => {
            setCurrRole(res.data.role);
        })

        const interval = setInterval(() => {

        axiosInstance
            .get('debate/current/')
            .then((res) => {
                // console.log(res);
                setSomeError(false);
                setErrorMessage('');
                setDebateType(res.data.type);
                setEntryCode(res.data.entry_code);
                setNoJudges(res.data.no_judges);
                setMotion(res.data.motion);
                setJudge(setJudgeArray(res.data.no_judges, res.data.has_chair));
                setPosts(setDebaterArray(res.data.team_size));
                setHasChair(res.data.has_chair);
                setWaitValue(true);
                console.log(hasChair);
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


    function setJudgeArray(noJudges, hasChair) {
      const judgeArr = [];

      for (let i = 1; i <= noJudges; i++)
      {
          if (i == 1 && hasChair)
          {
            judgeArr.push("1 (chair)")
          }
          else
          {
            judgeArr.push(i);
          }
        }

      return judgeArr;
    }

    function setDebaterArray(teamSize)
    {
        const debaterArr = [];

        for (let i = 1; i <= teamSize; i++)
        {
            debaterArr.push(i)
        }

        return debaterArr;
    }

    function handleChoose(team, nr) {
        if (!ready) {
            let role = team + nr;
            console.log(role);

            axiosInstance
                .get('user/role/', {params:{'role':role}})
                .then(() => {
                    if (role != "spectator")
                    {
                      console.log('nemjo');
                      alert(role + 'is already chosen')
                    }
                    else
                    {
                      setCurrRole(role);

                      axiosInstance
                      .patch('user/current/', {'role':role})
                      .then((res) => {

                      })
                      .catch((err) => {
                          console.log(err);
                      });
                    }
                })
                .catch(() => {
                    console.log('jojo');
                    setCurrRole(role);

                    axiosInstance
                    .patch('user/current/', {'role':role})
                    .then((res) => {

                    })
                    .catch((err) => {
                        console.log(err);
                    });
                });
        } else {
            alert('You must not be ready in order to change role.');
        }
    }

    const handleChooseSpectator = () => {
        if (!ready) {
            setCurrRole('spectator');

            axiosInstance
            .patch('user/current/', {'role':'spectator'})
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    const handleChooseJudge = () => {
        if (!ready) {
            setCurrRole('judge');

            axiosInstance
            .patch('user/current/', {'role':'judge'})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    const handleMotion = (e) => {
        setMotion(e);
        axiosInstance
            .patch('debate/', {'motion': motion })
            .then((res) => {
                console.log(res);
                alert('sikerult');
                }
            )
            .catch((err) => {
                console.log(err);
                }
            )

    }

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
            onClick={event => handleChoose('pro', player)} key={player}
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
                <div className="col-md-6 col-sm-12 new-debate--card--participant--img">
                    <img src={face1} className="new-debate--card--picture"  />
                </div>
                {/* Ide jon a username */}
                <div className='
                    col-md-6 
                    col-sm-12
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
            onClick={event => handleChoose('con', player)} key={player}
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
                <div className="col-md-6 col-sm-12 new-debate--card--participant--img">
                    <img src={face1} className="new-debate--card--picture"  />
                </div>
                {/* Ide jon a username */}
                <div className='
                    col-md-6 
                    col-sm-12
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
    const judgeListed = postJudge.map((player) => {
      let role = 'judge' + player;
      let user = allUsers.find(user => user.role == role);
      let username = user == undefined ? "" : " - " + user.username;

      return (
        <div className="col-2 new-debate--participant" onClick={event => handleChoose('judge', player)} key={player}>
            {player}{username}
        </div>
      )
    }

    )

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

                {/* Gyakorlatilag ez a container sor */}
                <div className="new-debate--decision row justify-content-evenly">

                    { waitValue ? <>
                    <div
                        className="new-debate--decision--pro new-debate--dec col-3"
                    >
                        <div className="col-12 new-debate--pro-btn new-debate--label text-center font-weight-bold">Government</div>
                        <hr className='new-debate--line'></hr>
                        {proListed}
                    </div>

                    {/* Itt van a kozepso sor*/}
                    <div className='new-debate--motion col-6 text-center p-4'>
                        {/* Ez egy textfield lesz, hogy at lehessen irni ha arra volna igeny */}
                        <div className="row">
                            {/* <span className="new-debate--motion-text white-text">{motion}</span> */}
                            <div className="row">
                                <input  type="text" 
                                        className="new-debate--motion-text col-12" 
                                        defaultValue={motion} 
                                        placeholder={motion} 
                                        onChange={(ev) => {setMotion(ev.target.value)}}/>
                            </div>
                            <div className="row">
                                <div 
                                    className="new-debate--motion-set col-12"
                                    onClick={handleMotion}
                                >
                                    set
                                </div>
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

                        {/* ide jon most a NEXT, setDebateType, spectator gomb */}
                        <div className="row new-debate--spacemaker"></div>
                        <div className="row new-debate--selectDebate">SELECT TYPE: </div>
                        <div className="row new-debate--start"> 
                            {/* ha megvan minden fontos, el lehet inditani a vitat --  de ez sem biztos hogy kell  */}
                            {
                                ready  && ( ( currRole == 'judge' ) )?
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
                        </div>
                        <div className="row new-debate--judge--spectator justify-content-evenly"> 
                            <div 
                                className="
                                    new-debate--spectator-col 
                                    new-debate--button 
                                    col-3 white-text 
                                    text-center" 
                                    onClick={handleChooseJudge}
                                >
                                judge
                            </div>    
                            <div 
                                className="
                                    new-debate--spectator-col 
                                    new-debate--button 
                                    col-3 white-text 
                                    text-center" 
                                    onClick={handleChooseSpectator}
                                >
                                spectator
                            </div>
                            <div
                                className="col-3 new-debate--button white-text text-center"
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
                        <div className="row">Ide be kene tenni a birot, az fasza lenne sztem (vagyis legalulra)</div>
                    </div>
                    <div
                        className="new-debate--decision--con new-debate--dec col-3"
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

                {/* <div className="new-debate--spectator  row justify-content-center">
                    <div 
                        className="
                            new-debate--spectator-col 
                            new-debate--button 
                            col-4 white-text 
                            text-center" 
                            onClick={handleChooseSpectator}
                        >
                        spectator
                    </div>
                </div> */}

                {/* Ez a regi ready gomb  */}
                {/* <div className="new-debate--clear-btn-container row justify-content-center">
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
                </div> */}
                
                </>
                }
            </div>
        </div>
    )
}

export default NewDebate
