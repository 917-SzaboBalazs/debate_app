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
  const [ finalMessage, setFinal ] = useState('');
  let message = '...';

  let navigate = useNavigate();


  // check if teh username is a valid one
  const validateUsername = (username) => {
    const lang = localStorage.getItem('lang')
    if (lang === 'en')
    {
      if (username === '') {
        message = 'The username field must not be empty.';
        return false;
      }
  
      if (username.length > 20) {
        message = 'The length of the username must be maximum 20 characters.';
        return false;
      }
    }
    else
    {
      if (username === '') {
        message = 'A felhasználónév nem lehet üres.';
        return false;
      }
  
      if (username.length > 20) {
        message = 'A felhasználónév legfeljebb 20 karakter hosszú lehet.';
        return false;
      }
    }
    

    return true;
  }

  // check if the password is a valid one
  const validatePassword = (password, passwordAgain) => {
    const lang = localStorage.getItem('lang')
    if (lang === 'en')
    {
      if (password === '' || passwordAgain === '') {
        message = 'The password fields must not be empty.';
        return false;
      }
  
      if (password !== passwordAgain) {
        message = 'The passwords must match.';
        return false;
      }
  
      if (password.length < 8) {
        message = 'The password must be at least 8 characters';
        return false;
      }
    }
    else
    {
      if (password === '' || passwordAgain === '') {
        message = 'A jelszó mezők nem lehetnek üresek.';
        return false;
      }
  
      if (password !== passwordAgain) {
        message = 'A jelszavak nem egyeznek.';
        return false;
      }
  
      if (password.length < 8) {
        message = 'A jelszónak legalább 8 karakter hosszúnak kell lennie.';
        return false;
      }
    }
    

    return true;
  }

  // check if the email is a valid one
  const validateEmail = (email) => {
    const lang = localStorage.getItem('lang')
    if (lang === 'en')
    {
      if (email === '') {
        message = 'The email field must not be empty.';
        return false;
      }
  
      if (email.length > 40) {
        message = 'The email must be at most 40 characters.';
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
    }
    else
    {
      if (email === '') {
        message = 'Az email mező nem lehet üres.';
        return false;
      }
  
      if (email.length > 40) {
        message = 'Az email legfeljebb 40 karakter hosszú lehet.';
        return false;
      }
  
      if (!String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
        message = 'Helytelen email.'
        return false;
      }
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
          .post('user/', {
            username: userName,
            email: email,
            password: password
          })
          .then((res) => {
            const lang = localStorage.getItem('lang')
            if(lang === 'en')
            {
              setFinal('Success! Your account has been created!');
            }
            else{
              setFinal('Sikeres regisztráció!');
            }
            
            
            // wait for 3 seconds before redirecting to home page
            const delay = ms => new Promise(res => setTimeout(res, ms));

            const waitFunc = async () => {
              await delay(1500);

              navigate('/log-in');
            }
            waitFunc();
          })
          .catch((err) => {

            const lang = localStorage.getItem('lang')
            if (lang === 'en')
            {
              if (typeof(err.response.data) == 'undefined') {
                setFinal('Server error.');
              }
              if (typeof(err.response.data.username) != 'undefined') {
                setFinal('This username already exists.');
                setUserName('');
              } else if (typeof(err.response.data.email) != 'undefined') {
                setFinal('This email address has been used before.');
                setEmail('');
              } else if (err.response.status === 400){
                setFinal('Unexpected error');
              } 
            }
            else
            {
              if (typeof(err.response.data) == 'undefined') {
                setFinal('Szerverhiba.');
              }
              if (typeof(err.response.data.username) != 'undefined') {
                setFinal('A felhasználónév foglalt.');
                setUserName('');
              } else if (typeof(err.response.data.email) != 'undefined') {
                setFinal('Az email cím már használatban van.');
                setEmail('');
              } else if (err.response.status === 400){
                setFinal('Váratlan hiba');
              } 
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
                            onClick={handleSubmit}
                        >
                            {t("signUp.create")}
                        </button>
                      </div>
                      <div className="signup--already-cont row">
                        <Link className="signup--already-have-an-account col-12" to='/log-in'><span>{t("signUp.call")}</span></Link>
                      </div>
                   {/* </div> */}
                   </div>
                  </div>
              </div>
          </div>
          <SignupPopup trigger={trigger} setTrigger={setTrigger}>
            <h3>{finalMessage}</h3>
          </SignupPopup>

        </div>
    </div>
  )
}

export default Signup
