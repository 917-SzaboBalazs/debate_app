import React from 'react';
import Select from 'react-select';
import { useState } from 'react';

import './CreateDebate.css'

function CreateDebate(props) {
  const [ debateType, setType ] = useState('britt-parlamenti');

  const options = [
    { value: 'britt-parlamenti', label: 'Britt Parlamenti' },
    { value: 'lincoln-douglas', label: 'Lincoln-Douglas' },
    { value: 'spontan', label: 'Spontán' },
    { value: 'publikus', label: 'Publikus' }
  ];

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
              options={options} 
              onChange={(e) => setType(e.value)}
              />
            <button className="create" onClick={() => console.log(debateType)}>
                Create!
            </button>
        </div>
    </div>
  ) : "";
}

export default CreateDebate