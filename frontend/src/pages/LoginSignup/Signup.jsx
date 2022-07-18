import React from 'react'
import { Link } from 'react-router-dom';
import { useSate } from 'react'

// import '../../App.css'
import './Signup.css'

function Login() {

  return (
    <div className='login-body'>
        <div className="trunk-container">
            <div className="login-img">
              <Link to="/log-In">
                <button className='login-btn'>Let`s Start!</button>
              </Link>
            </div>
            <div className="login-container">
                <div className="login-box">
                    <h5 className="username-text">Username:</h5>
                    <input type="text" placeholder='eg.: myUserName' className="username" />
                    <h5 className="email-text">Email:</h5>
                    <input type="text" placeholder='eg.: me@lol.com' className="email" />
                    <h5 className="password-text">Password:</h5>
                    <input type="password" placeholder='eg.: Passwd1234' className='password' />
                    <h5 className="password-text">Password again:</h5>
                    <input type="password" placeholder='eg.: Passwd1234' className='password' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login