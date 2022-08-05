import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import SignupPopup from './SignupPopup';

// import '../../App.css'
import './Signup.css'

function Signup() {

  const [ userName, setUserName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordAgain, setPasswordAgain ] = useState('');

  const [ trigger, setTrigger ] = useState(false);
  const [ message, setMessage ] = useState('');

  const [ user, setUser ] = useState( {
    'username': '',
    'email': '',
    'password': ''
  });

  const checkInformation = () => {
    if ( password !== passwordAgain ) {
      console.log('A ket jelszo nem egyezik meg ' + password + ' ' + passwordAgain)
      setMessage('A ket jelszo nem egyezik.');
      return false;
    } 

    setMessage('Helyes adatok.');
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkInformation()) {

      const temp = {
        username: {userName},
        email: {email},
        password: {password}
      }
  
      setUser(temp)
      
      axios.post('loaclhost:8000/api/register/', {temp})
        .then((res) => {console.log('Sikeres regisztracio.')})
        .catch((err) => {
            console.log('Valami hiba tortent a regisztracio soran.');
            setMessage('POST hiba.')});
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
                        type="text" 
                        placeholder='eg.: myUserName' 
                        className="username" 
                        value = {userName}
                        onChange = {(event) => { setUserName(event.target.value);}
                        }
                    />
                    <h5 className="email-text">Email:</h5>
                    <input 
                        type="text" 
                        placeholder='eg.: me@lol.com' 
                        className="email" 
                        value={email}
                        onChange = {(event) => { setEmail(event.target.value);}
                        }
                    />
                    <h5 className="password-text">Password:</h5>
                    <input 
                        type="password" 
                        placeholder='eg.: Passwd1234' 
                        className='password'
                        value={password}
                        onChange = {(event) => { setPassword(event.target.value);}
                        }
                    />
                    <h5 className="password-text">Password again:</h5>
                    <input 
                        type="password" 
                        placeholder='eg.: Passwd1234' 
                        className='password' 
                        value={passwordAgain}
                        onChange = {(event) => { setPasswordAgain(event.target.value);}
                        }
                    />
                </div>
            </div>
        </div>
        <SignupPopup trigger={trigger} setTrigger={setTrigger}>
          <h3>{message}</h3>
        </SignupPopup>
        </form>
    </div>
  )
}

export default Signup