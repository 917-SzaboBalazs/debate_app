import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../axios'
import SignupPopup from '../../components/Popups/SignupLogin/SignupPopup';
import { useTranslation } from 'react-i18next'

import './Signup.css'

import image1 from '../../images/signup1.jpg';
import image2 from '../../images/signup2.jpg'
import image3 from '../../images/signup3.jpg'
import image4 from '../../images/signup4.jpg'
import image5 from '../../images/signup5.jpg'
import image6 from '../../images/signup6.jpg'
import image7 from '../../images/signup7.jpg'

function Signup() {
  const { t } = useTranslation();
  const [ userName, setUserName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordAgain, setPasswordAgain ] = useState('');

  const [ trigger, setTrigger ] = useState(false);
  const [ message, setMessage ] = useState("");

  let navigate = useNavigate();


  // check if teh username is a valid one
  const validateUsername = () => {
      if (userName === '') {
        setMessage("signUp.validation.non_empty_username");
        return false;
      }
  
      if (userName.length > 20) {
        setMessage('signUp.validation.too_long_username');
        return false;
      }
    

    return true;
  }

  // check if the password is a valid one
  const validatePassword = () => {
      if (password === '' || passwordAgain === '') {
        setMessage("signUp.validation.non_empty_password");
        return false;
      }
  
      if (password !== passwordAgain) {
        setMessage("signUp.validation.non_matching_passwords");
        return false;
      }
  
      if (password.length < 8) {
        setMessage("signUp.validation.too_short_password");
        return false;
      }
    

    return true;
  }

  // check if the email is a valid one
  const validateEmail = () => {
    if (email === '') {
      setMessage("signUp.validation.non_empty_email");
      return false;
    }

    if (email.length > 40) {
      setMessage("signUp.validation.too_long_email");
      return false;
    }

    if (!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      setMessage("signUp.validation.non_valid_email");
      return false;
    }
    

    return true;
  };

  // check all the information
  const checkInformation = () => {

    if (!validateUsername()) {
      setUserName('');
      return false;
    }

    if (!validateEmail()) {
      setEmail('');
      return false;
    }

    if ( !validatePassword()) {
      setPassword('');
      setPasswordAgain('');
      return false;
    }

    return true;
  }

  // handle the submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkInformation()) {

      axiosInstance
          .post('user/', {
            username: userName,
            email: email,
            password: password
          })
          .then((res) => {
            setMessage('signUp.account_created');
            
            
            // wait for 3 seconds before redirecting to home page
            const delay = ms => new Promise(res => setTimeout(res, ms));

            const waitFunc = async () => {
              await delay(1500);

              navigate('/log-in');
            }
            waitFunc();
          })
          .catch((err) => {

            if (typeof(err.response.data) == 'undefined') {
              setMessage('signUp.server_validation.server_error');
            }
            if (typeof(err.response.data.username) != 'undefined') {
              setMessage('signUp.server_validation.duplicate_username');
              setUserName('');
            } else if (typeof(err.response.data.email) != 'undefined') {
              setMessage('signUp.server_validation.duplicate_email');
              setEmail('');
            } else if (err.response.status === 400){
              setMessage('signUp.server_validation.unexpected_error');
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
  let timer;
  
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

        <div className="trunk-container fade-in">
            <div className="signup--container d-flex align-items-center justify-content-center">
                <div className="signup-box align-items center">
                    {/* <div className="signup-box-2 col-12"> */}
                    <h1 className="signup--signup-title">{t("signUp.title")}</h1>

                    <form onSubmit={handleSubmit}>
                      <div className="icon-container">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder={t("signUp.username")}
                            className="username"
                            value={userName}
                            onChange = {(e) => {
                              setUserName(e.target.value);
                            } }
                        />
                        <i>&#xf007;</i>
                      </div>

                      <div className="icon-container">
                        <input
                            id="email"
                            name="email"
                            type="text"
                            placeholder={t("signUp.email")}
                            className="email"
                            value={email}
                            onChange = {(e) => {
                              setEmail(e.target.value);
                            } }
                        />
                        <i>&#xf003;</i>
                      </div>

                      <div className="icon-container">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder={t("signUp.password")}
                            className='password'
                            value={password}
                            onChange = {(e) => {
                              setPassword(e.target.value);
                            } }
                        />
                        <i>&#xf023;</i>
                      </div>

                      <div className="icon-container">
                        <input
                            id="passwordAgain"
                            name="passwordAgain"
                            type="password"
                            placeholder={t("signUp.passwordAgain")}
                            className='password'
                            value={passwordAgain}
                            onChange = {(e) => {
                              setPasswordAgain(e.target.value);
                            } }
                        />
                        <i>&#xf023;</i>
                      </div>
                      {/* </div> */}
                      <p className="signup--password-help">
                      {t("signUp.requirement")} <strong>{t("signUp.characters")}</strong>
                      </p>
                      
                      <div className="signup--btn-row row text-center">
                        <div className="singup--btn-cont col-12">
                          <button
                              className='signup-btn'
                              type='submit'
                          >
                              {t("signUp.create")}
                          </button>
                        </div>
                        </div>
                        </form>
                      <div className="signup--already-cont row">
                        <Link className="signup--already-have-an-account col-12" to='/log-in'><span>{t("signUp.call")}</span></Link>
                      </div>
                   {/* </div> */}
                   
                  </div>
              </div>
          </div>
          <SignupPopup trigger={trigger} setTrigger={setTrigger} setMessage={setMessage} >
            <h3>{t(message)}</h3>
          </SignupPopup>

        </div>
    </div>
  )
}

export default Signup
