import React from 'react'

import './SignupPopup.css'

function SignupPopup(props) {
  return (props.trigger) ? (
    <div className="signup-popup">
        <div className="signup-popup--inner">
            <button className="close-btn" onClick={() => {props.setTrigger(false); props.setMessage(""); }}>X</button>
            {props.children}
        </div>
    </div>
  ) : '';
}

export default SignupPopup