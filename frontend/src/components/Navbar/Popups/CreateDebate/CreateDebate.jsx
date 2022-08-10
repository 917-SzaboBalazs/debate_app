import React from 'react';
import Select from 'react-select';
import { useState } from 'react';
import  { Link, useNavigate } from 'react-router-dom';


import './CreateDebate.css'


function CreateDebate(props) {
  const [ debateType, setType ] = useState('britt-parlamenti');
  const navigate = useNavigate();

  const options = [
    { value: 'britt-parlamenti', label: 'Britt Parliament' },
    { value: 'lincoln-douglas', label: 'Lincoln-Douglas' },
    { value: 'spontan', label: 'Spontaneous' },
    { value: 'publikus', label: 'Public' }
  ];

  const handleCreate = () => {
    console.log(debateType);
    props.setTrigger(false);
    navigate('/new-debate', {
      state: {
        type: debateType,
      }
    });
  };

  return (props.trigger) ? (
    <div className="create-debate">
        <div className="create-debate--inner">
            <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
            <h3 className="create-debate--text">
                Select debate type
            </h3>
            <Select 
              className="select-debate" 
              defaultValue={options[0]}
              options={options} z
              onChange={(e) => setType(e.value)}
              />
            <button className="create" onClick={handleCreate}>
                Create!
            </button>
        </div>
    </div>
  ) : "";
}

export default CreateDebate