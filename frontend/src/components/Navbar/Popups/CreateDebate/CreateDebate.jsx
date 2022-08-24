import React from 'react';
import Select from 'react-select';
import { useState } from 'react';
import  { Link, useNavigate } from 'react-router-dom';


import './CreateDebate.css'
import axiosInstance from '../../../../axios';


function CreateDebate(props) {
  const [ debateType, setType ] = useState('brittish');
  const navigate = useNavigate();

  const options = [
    { value: 'brittish', label: 'brittish' },
    { value: 'lincoln-douglas', label: 'Lincoln-Douglas' },
    { value: 'spontan', label: 'Spontaneous' },
    { value: 'publikus', label: 'Public' }
  ];

  const handleCreate = () => {
    console.log(debateType);
    props.setTrigger(false);

    axiosInstance
      .post('debate/', { 'type':'brittish'})
      .then((res) => {
        navigate('/new-debate');
        }
      )
      .catch((err) => {
        console.log(err);
        }
      )

  };

  return (props.trigger) ? (
    <div className="create-debate">
        <div className="create-debate--inner">
            <button className="create-debate--close-btn" onClick={() => props.setTrigger(false)}>X</button>
           {/* { props.loggedIn ?  */}
            <>
            <h3 className="create-debate--text">
                Select debate type
            </h3>
            <Select 
              className="select-debate" 
              defaultValue={options[0]}
              options={options} z
              onChange={(e) => setType(e.value)}
              />
            <button className="create-debate--create-btn" onClick={handleCreate}>
                Create!
            </button>
            </> 
            :
            {/* <h1>You have to be logged in first, in order to create a debate.</h1> */}
           {/* } */}
        </div>
    </div>
  ) : "";
}

export default CreateDebate