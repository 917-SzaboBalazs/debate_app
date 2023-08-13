import React from 'react';
import Select from 'react-select';
import { useState } from 'react';
import  { Link, useNavigate } from 'react-router-dom';


import './CreateDebate.css'
import axiosInstance from '../../../axios';


function CreateDebate(props) {
  const [ debateType, setType ] = useState('british');
  const navigate = useNavigate();
  const [ noJudges, setNoJudges ] = useState(1);
  const [ speakerTime, setSpeakerTime ] = useState(6);
  const [ hasChair, setChair ] = useState(false);
  const [ motion, setMotion ] = useState('');

  const options = [
    { value: 'british', label: 'british' },
    { value: 'lincoln-douglas', label: 'Lincoln-Douglas' },
    { value: 'spontan', label: 'Spontaneous' },
    { value: 'publikus', label: 'Public' }
  ];

  const handleCreate = () => {
    console.log(debateType);
    props.setTrigger(false);

    if (motion === '' ) {

      return;
    }

    // amikor mindent atkuld a debaterol
    axiosInstance
      .post('debate/', { 'type': debateType, 'motion': motion, 'no_judges': noJudges, 'speaker_time': speakerTime, 'has_chair': hasChair, 'status': 'lobby'})
      .then((res) => {
        navigate('/new-debate');
        props.setIndebate(true);

        axiosInstance
          .patch('user/current/', {
            'role': 'spectator'
          })
          .catch((err) => {
            console.log(err);
          })
        }
      )
      .catch((err) => {
        console.log(err);
        }
      )

    

  };

  const handleNumber = (val) => {
    setNoJudges(val.target.value);
  }

  const handleSpeakerTime = (val) => {
    setSpeakerTime(val.target.value);
  }

  const handleCheckBox = () => {
    setChair(!hasChair);
  }

  return (props.trigger) ? (
    <div className="create-debate">
        <div className="create-debate--inner row">
            <button className="create-debate--close-btn" onClick={() => props.setTrigger(false)}>X</button>
           { props.loggedIn ?
            <>
            <h3 className="create--debate-text white-text">Tételmondat</h3>
            <input type="text" className="create-debate--motion input" onChange={(ev) => {setMotion(ev.target.value)}}/>
            <h3 className="create-debate--text">
                Vita típusa
            </h3>
            <Select
              className="select-debate create-debate--input"
              defaultValue={options[0]}
              options={options}
              onChange={(e) => setType(e.value)}
              />
            <h3 className="create-debate--text col-12">
              Bírók száma
            </h3>
            <input type="number" className="create-debate--no-judges create-debate--input col-12" value={noJudges} onChange={ev => handleNumber(ev)}/>

            <h3 className="create-debate--text col-12">
              Beszédek hossza (perc)
            </h3>
            <input type="number" className="create-debate--speaker-time create-debate--input col-12" value={speakerTime} onChange={ev => handleSpeakerTime(ev)}/>

            <h3 className="create-debate--text col-8">
              Ház?
            </h3>
            <input type="checkbox" className="create-debate--chair create-debate--input col-4" value={hasChair} onChange={handleCheckBox}/>
            <button className="create-debate--create-btn" onClick={handleCreate}>
                Létrehoz!
            </button>
            </>
            :
            <h1 className='white-text'>You have to be logged in first, in order to create a debate.</h1>
            }
        </div>
    </div>
  ) : "";
}

export default CreateDebate
