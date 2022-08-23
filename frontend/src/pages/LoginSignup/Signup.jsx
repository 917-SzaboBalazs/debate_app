import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../axios'
import SignupPopup from './SignupPopup';

import './Signup.css'

import image1 from '../../images/signup1.jpg';
import image2 from '../../images/signup2.jpg'
import image3 from '../../images/signup3.jpg'
import image4 from '../../images/signup4.jpg'
import image5 from '../../images/signup5.jpg'
import image6 from '../../images/signup6.jpg'
import image7 from '../../images/signup7.jpg'

function Signup() {

  

  const [ userName, setUserName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordAgain, setPasswordAgain ] = useState('');

  const [ trigger, setTrigger ] = useState(false);
  const [ finalMessage, setFinal ] = useState('');
  let message = '...';

  let navigate = useNavigate();


  // check if teh username is a valid one
  const validateUsername = (username) => {
    if (username === '') {
      message = 'The username field must not be empty.';
      return false;
    }

    if (username.length < 5 || username.length > 50) {
      message = 'The username must be between 5 and 51 characters.';
      return false;
    }

    return true;
  }

  // check if the password is a valid one
  const validatePassword = (password, passwordAgain) => {
    if (password === '' || passwordAgain === '') {
      message = 'The password fields must not be empty.';
      return false;
    }

    if (password !== passwordAgain) {
      message = 'The passwords must match.';
      return false;
    }

    if (password.length < 8 || password.length > 50) {
      message = 'The password must be between 8 and 51 characters.';
      return false;
    }

    if (!/([A-Z]+)/g.test(password)) {
      message = 'There must be at least one capital letter in your password.';
      return false;
    }

    if (!/([0-9]+)/g.test(password)) {
      message = 'There must be at least one number in your password.';
      return false;
    }

    return true;
  }

  // check if the email is a valid one
  const validateEmail = (email) => {
    if (email === '') {
      message = 'The email field must not be empty.';
      return false;
    }

    if (!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      message = 'The given email addres is not valid.'
      return false;
    }

    return true;
  };

  // check all the information
  const checkInformation = () => {
    let checker = true;

    if (!validateUsername(userName)) {
      setUserName('');
      checker = false;
    }
    else if ( !validatePassword(password, passwordAgain)) {
      setPassword('');
      setPasswordAgain('');
      checker = false;
    } else if (!validateEmail(email)) {
      setEmail('');
      checker = false;
    }

    setFinal(message);
    return checker;
  }

  // handle the submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkInformation()) {

      axiosInstance
          .post('user/register/', {
            username: userName,
            email: email,
            password: password
          })
          .then((res) => {
            console.log('Succes!');
            setFinal('Succes! (you will be redirected to home-page in 3 seconds');
            
            // wait for 3 seconds before redirecting to home page
            const delay = ms => new Promise(res => setTimeout(res, ms));

            const waitFunc = async () => {
              await delay(3500);

              navigate('/');
            }
            waitFunc();
          })
          .catch((err) => {

              if (typeof(err.response.data) == 'undefined') {
                  setFinal('Server error.');
              }
              
              if (typeof(err.response.data.username) != 'undefined') {
                console.log(err.response.data.username);
                setFinal('This username already exists.');
                setUserName('');
              } else if (typeof(err.response.data.email) != 'undefined') {
                setFinal('User with this email already exists.');
                setEmail('');
              } else if (err.response.status === 400){
                setFinal('Unexpected error');
              } 

            });
    }

    // sets the trigger true => popup screen
    setTrigger(true);
  };


  const images = [
    image1,   
    image2,
    image4,
    image5,
    image6,
    image7,
  ];

  const [value, setValue] = React.useState(0);
  let timer
  
  const updateCount = () => {
    timer = setInterval(() => {
      console.log(value);
      setValue(prevCount => (prevCount + 1) % images.length) // new
    }, 5000)
  }
  
  useEffect(() => {
    updateCount();
    
    return () => clearInterval(timer)
  }, [value])

  return (
    <div className='signup-body base'>
      <div className="container">
        <form>
        <div className="trunk-container row">
            <div className="signup--left-side p-0 col-md-6 col-sm-12" >
              <img src={images[value]} className='signup--bg-img'/>
              {/* <div className="signup-img row">
                  <div className="singup--btn-cont col-12 text-center">
                    <button
                        className='signup-btn'
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Let`s Start!
                    </button>
                  </div>
                  <div className="signup--already-cont row ">
                    <Link className="signup--already-have-an-account col-12 text-center" to='/log-In'><span>Already have an account</span></Link>
                  </div>
              </div> */}
            </div>
            <div className="signup--container d-flex align-items-center justify-content-center col-md-6 col-sm-12">
                <div className="signup-box ">
                    {/* <div className="signup-box-2 col-12"> */}
                    <h1 className="signup--signup-title">Register:</h1>
                    <h5 className="username-text">Username:</h5>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder='eg.: myUserName'
                        className="username"
                        value={userName}
                        onChange = {(e) => {
                          setUserName(e.target.value);
                        } }
                    />
                    <h5 className="email-text">Email:</h5>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder='eg.: me@lol.com'
                        className="email"
                        value={email}
                        onChange = {(e) => {
                          setEmail(e.target.value);
                        } }
                    />
                    <h5 className="password-text">Password:</h5>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder='eg.: Passwd1234'
                        className='password'
                        value={password}
                        onChange = {(e) => {
                          setPassword(e.target.value);
                        } }
                    />
                    <h5 className="password-text">Password again:</h5>
                    <input
                        id="passwordAgain"
                        name="passwordAgain"
                        type="password"
                        placeholder='eg.: Passwd1234'
                        className='password'
                        value={passwordAgain}
                        onChange = {(e) => {
                          setPasswordAgain(e.target.value);
                        } }
                    />
                    {/* </div> */}
                    {/* <p className="signup--password-help text-center">
                      The password needs to be at least 8 characters long, has to contain a capital letter and a number at least.
                    </p> */}
                    
                    <div className="signup--btn-row row">
                      <div className="singup--btn-cont col-12 text-center">
                        <button
                            className='signup-btn'
                            type='submit'
                            onClick={handleSubmit}
                        >
                            Register
                        </button>
                      </div>
                      <div className="signup--already-cont row text-center">
                        <Link className="signup--already-have-an-account col-12 text-center" to='/log-In'><span>Already have an account</span></Link>
                      </div>
                   {/* </div> */}
                   </div>
                  </div>
              </div>
          </div>
          <SignupPopup trigger={trigger} setTrigger={setTrigger}>
            <h3>{finalMessage}</h3>
          </SignupPopup>
          </form>
        </div>
    </div>
  )
}

export default Signup
