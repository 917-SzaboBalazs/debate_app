import React from 'react';
import { useState } from 'react';

import './CreateDebate.css'

function CreateDebate(props) {
  return (props.trigger) ? (
    <div className="create-debate">
        <div className="create-debate--inner">
            <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
            <h3 className="create-debate--text">
                Let's Create a Debate!
            </h3>
            <p>Ide teszunk be minden cuccot.</p>
            <button className="create" >
                Create!
            </button>
        </div>
    </div>
  ) : "";
}

export default CreateDebate