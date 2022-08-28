import React from 'react'

import './LoginPopup.css'

function LoginPopup(props) {
  return (props.trigger) ? (
    <div className="login-popup">
        <div className="login-popup--inner">
            <button className="loginpopup--close-btn" onClick={() => props.setTrigger(false)}>X</button>
            {props.children}
        </div>
    </div>
  ) : '';
}

export default LoginPopup