import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../../axios'
import SignupPopup from './SignupPopup';

// import '../../App.css'
import './Signup.css'

function Signup() {

  //const [ userName, setUserName ] = useState('');
  //const [ email, setEmail ] = useState('');
  //const [ password, setPassword ] = useState('');
  //const [ passwordAgain, setPasswordAgain ] = useState('');
  var userName;
  var email;
  var password;
  var passwordAgain;

  const [ trigger, setTrigger ] = useState(false);
  const [ finalMessage, setFinal ] = useState('');
  let message = '...';

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const checkInformation = () => {
    let checker = true;

    if ( password !== passwordAgain ) {
      console.log('A ket jelszo nem egyezik meg: ' + password + ', ' + passwordAgain)
      message = 'A ket jelszo nem egyezik, kerjuk probald ujra.';
      checker = false;
    } else if (!validateEmail(email)) {
      console.log('Az email nem ervenyes\nKerjuk probald ujra.');
      message = 'Az email nem ervenyes, kerjuk probald ujra.';
      checker = false;
    }
    setFinal(message);
    return checker;
  }

  const handleChange = (e) => {
    //console.log(e.target);
    if (e.target.name == "username")
    {
      userName = e.target.value;
    }
    else if (e.target.name == "email")
    {
      email = e.target.value;
    }
    else if (e.target.name == "password")
    {
      password = e.target.value;
    }
    else if (e.target.name == "passwordAgain")
    {
      passwordAgain = e.target.value;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    document.getElementById('username').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('passwordAgain').value = "";

    if (checkInformation()) {

      axiosInstance
          .post('user/register/', {
            username: userName,
            email: email,
            password: password
          })
          .then((res) => {
            console.log('Sikeres regisztracio.');
            setFinal('Sikeres regisztracio.');
          })
          .catch((err) => {
              console.log(err.response);
              setFinal('POST hiba');
            });
    }

    setTrigger(true);
  };


  return (
    <div className='login-body'>
        <form>
        <div className="trunk-container">
            <div className="login-img">
              {/* <Link to="/log-In"> */}
                <button
                    className='login-btn'
                    type='submit'
                    onClick={handleSubmit}
                >
                    Let`s Start!
                </button>
              {/* </Link> */}
            </div>
            <div className="login-container">
                <div className="login-box">
                    <h5 className="username-text">Username:</h5>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder='eg.: myUserName'
                        className="username"
                        onChange = {handleChange}
                    />
                    <h5 className="email-text">Email:</h5>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder='eg.: me@lol.com'
                        className="email"
                        onChange = {handleChange}
                    />
                    <h5 className="password-text">Password:</h5>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder='eg.: Passwd1234'
                        className='password'
                        onChange = {handleChange}
                    />
                    <h5 className="password-text">Password again:</h5>
                    <input
                        id="passwordAgain"
                        name="passwordAgain"
                        type="password"
                        placeholder='eg.: Passwd1234'
                        className='password'
                        onChange = {handleChange}
                    />
                </div>
            </div>
        </div>
        <SignupPopup trigger={trigger} setTrigger={setTrigger}>
          <h3>{finalMessage}</h3>
        </SignupPopup>
        </form>
    </div>
  )
}

export default Signup
