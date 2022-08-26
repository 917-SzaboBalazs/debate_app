import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../axios'

import image1 from '../../images/signup1.jpg';
import image2 from '../../images/signup2.jpg'
import image3 from '../../images/signup3.jpg'
import image4 from '../../images/signup4.jpg'
import image5 from '../../images/signup5.jpg'
import image6 from '../../images/signup6.jpg'
import image7 from '../../images/signup7.jpg'

import './Login.css'

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


          // console.log(res);
          navigate('/');
          window.location.reload(false);
        })
        .catch((err) => {
          alert('baj van.');
          console.log(err);
        })
    }

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
    <div className='login-body base'>
      <div className="container">
        <div className="login--trunk-container row bg-light">
          {/* <form action="" className=""> */}
            <div className="login-container d-flex align-items-center justify-content-center col-md-6 col-sm-12 ">
                <div className="login-box align-items-center">
                    <h1 className="login--login-title">
                      Sign In
                    </h1>
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

                  <div className="login-btn-row row text-center">
                    <div className="login--btn-cont col-12 ">
                        <button type='submit'  className='login-btn bg-succes' onClick={handleSubmit}>Sign In</button>
                    </div>
                  </div>
                  <div className="login--dont-have-cont row">
                    <Link className="login--dont-have-account col-12" to='/sign-up'><span>Don`t have an account?</span></Link>
                  </div>
                </div>
            </div>
            <div className="login--right-side col-md-6 col-sm-12 p-0">
              <img src={images[value]} className='login--bg-img'/>
              {/* <div className="login--right-side-box col-12 ">
                <div className="login-img row text-center">
                  <div className="login--btn-cont col-12 ">
                      <button type='submit'  className='login-btn' onClick={handleSubmit}>Let`s Start!</button>
                  </div>
                </div>
                <div className="login--dont-have-cont row">
                  <Link className="login--dont-have-account col-6 text-center" to='/sign-up'><span>Don`t have an account?</span></Link>
                </div>
              </div> */}
            </div>
            {/* </form> */}
          </div>
        </div>
    </div>
  )
}

export default Login