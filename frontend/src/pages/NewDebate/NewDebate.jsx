import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './NewDebate.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../axios';
import axios from 'axios';

function NewDebate() {
    // const location = useLocation();
    // const type = location.state.type;
    const navigate = useNavigate();
    const [ debateType, setDebateType ] = useState('');
    const [ entryCode, setEntryCode ] = useState('');
    const [ someError, setSomeError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ noJudges, setNoJudges ] = useState(1);
    const [ motion, setMotion ] = useState('');
    const [ currRole, setCurrRole ] = useState('spectator');

    const [ ready, setReady ] = useState(false);
    const [ posts, setPosts ] = useState([]);
    const [ postJudge, setJudge ] = useState([]);
    const [ hasChair, setHasChair ] = useState(false);
    const [ waitValue, setWaitValue ] = useState(false);
    const [ allUsers, setAllUsers] = useState([]);

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


        }, 900)

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
      let username = user == undefined ? "" : " - " + user.username;

      return (
        <div className="col-2 new-debate--participant" onClick={event => handleChoose('pro', player)} key={player}>
            {player}{username}
        </div>
      )
    }

    )
    const conListed = posts.map((player) => {
      let role = 'con' + player;
      let user = allUsers.find(user => user.role == role);
      let username = user == undefined ? "" : " - " + user.username;

      return (
        <div className="col-2 new-debate--participant" onClick={event => handleChoose('con', player)} key={player}>
            {player}{username}
        </div>
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

                <div className="row">
                    <h1 className='new-debate--motion col-12 text-center p-4'><span className="new-debate--motion-text white-text">"{motion}"</span></h1>
                </div>
                <div className="row pt-4">
                    <h2 className='new-debate--basic-text col-md-6 col-sm-12 text-center white-text'>Vita típus: {debateType}</h2>
                    <h2 className='new-debate--current-role col-md-6 col-sm-12 text-center white-text'>Szerep: {currRole}</h2>
                </div>
                <div className="row">
                    <h2 className='new-debate--ready col-md-6 col-sm-12 text-center white-text'>Kész: {ready ? 'true' : 'false'}</h2>
                    <h2 className='new-debate--entry-code col-md-6 col-sm-12 text-center white-text'>Vita kód: {entryCode}</h2>
                </div>

                <div className="new-debate--procon-row row pt-2 justify-content-around">
                </div>
                <div className="new-debate--decision row justify-content-evenly">
                    { waitValue ? <>
                    <div
                        className="new-debate--decision--pro new-debate--dec col-sm-3 col-md-3"
                    >
                        <div className="col-12 new-debate--pro-btn new-debate--label text-center font-weight-bold">PRO</div>
                        {proListed}
                    </div>
                    <div
                        className="new-debate--decision--con new-debate--dec col-sm-3 col-md-3"
                    >
                        <div className="col-12 new-debate--pro-btn text-center new-debate--label font-weight-bold">KONTRA</div>
                        {conListed}
                    </div>
                    <div className="new-debate--decision--judge col-sm-3 col-md-3">
                        <div className="col-12 new-debate--pro-btn new-debate--dec text-center  new-debate--label font-weight-bold">BÍRÓ</div>
                        {judgeListed}
                    </div>
                     </>   : null
                    }
                </div>

                <div className="new-debate--spectator  row justify-content-center">
                    <div className="new-debate--spectator-col new-debate--button col-4 white-text text-center" onClick={handleChooseSpectator}>
                        Szemlélő
                    </div>
                </div>

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
                                    Nem állok készen
                                </>
                                :
                                <>
                                    Készen állok
                                </>
                            }
                        </div>
                </div>
                {
                    ready && ( ( !hasChair && currRole == 'judge1' ) || ( hasChair && currRole == 'judge1 (chair)') )?
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

export default NewDebate
