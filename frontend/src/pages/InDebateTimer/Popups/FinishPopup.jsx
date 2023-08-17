import React from 'react';

import './FinishPopup.css';

export default function FinishPopup(props) {
  return (props.trigger) ? (
    <div className="finish-popup">
        <div className="finish-popup--inner">
            <p>Do you wish to finish the debate now?</p>
            <div className="finish-popup-buttons">
              <button onClick={() => {
                props.setTrigger(false);
                props.navigate('/results');
              }}>Yes</button>
              <button onClick={() => props.setTrigger(false)}>No</button>
            </div>
        </div>
    </div>
  ) : '';
}
