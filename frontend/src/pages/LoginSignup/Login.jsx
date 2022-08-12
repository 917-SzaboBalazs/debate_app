import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../axios'


// import '../../App.css'
import './Login.css'
import axios from 'axios';

function Login() {

    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');

    let navigate = useNavigate();

    const handleSubmit = () => {
      axiosInstance
        .post('token/', {
          username: userName,
          password: password
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
          axiosInstance.defaults.headers['Autorization'] = 
            'JWT ' + localStorage.getItem('access_token'); 

          console.log(res);

          navigate('logged-in/');
        })
        .catch((err) => {
          alert('baj van.');
          console.log(err);
        })
    }

  return (
    <div className='login-body'>
      <div className="container">
        <div className="trunk-container row">
          {/* <form action="" className=""> */}
            <div className="login-container col-6">
                <div className="login-box">
                    <h5 className="username-text">Username:</h5>
                    <input 
                      value={userName}
                      type="text"
                      placeholder='eg.: myUserName' 
                      className="username" 
                      onChange={(e) => setUserName(e.target.value)}  
                    />
                    <h5 className="password-text">Password:</h5>
                    <input 
                      value={password}
                      type="password" 
                      placeholder='eg.: Passwd1234' 
                      className='password' 
                      onChange={(e) => setPassword(e.target.value)}
                      />
                </div>
            </div>
            <div className="login--right-side col-6">
              <div className="login-img row">
                <div className="login--btn-cont col-12 text-center">
                    <button type='submit'  className='login-btn' onClick={handleSubmit}>Let`s Start!</button>
                </div>
              </div>
              <div className="login--dont-have-cont row">
                <Link className="login--dont-have-account col-12 text-center" to='/sign-up'><span>Don`t have an account?</span></Link>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
    </div>
  )
}

export default Login