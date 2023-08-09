import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { Link } from 'react-router-dom';

import './Profile.css';

import face1 from '../../images/faces/face1.svg';

function Profile() {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ inDebate, setInDebate ] = useState(false);
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ bDay, setbDay ] = useState('');
    const [ aboutMe, setAboutMe ] = useState('');
    const [ role, setRole ] = useState('');
    const [ username, setUserName ] = useState('');

    useEffect(() => {

        axiosInstance
          .get('user/current/')
          .then((res) => {
            console.log(res);
            setLoggedIn(true);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setEmail(res.data.email);
            setbDay(res.data.birthday);
            setAboutMe(res.data.about_me);
            setRole(res.data.role);
            setUserName(res.data.username);

            if (res.data.current_debate != null) {
              setInDebate(true);
            } else {
              setInDebate(false);
            }

          })
          .catch((err) => {
            console.log(err);
          });

      }, []);

  return (
    <>
    {
        loggedIn ?
        <>
            <div className="profile--base base">
                <div className="profile--container container d-flex justify-content-center">
                    <div className="profile--base-row row justify-content-center align-items-center">
                        <div className="col-md-12">
                            <div className="profile--img row d-flex justify-content-center">
                                <img src={face1} alt="" className="profile--img-element profile-element col-12" />
                            </div>
                            <h3 className="profile--about-me-box row d-flex justify-content-center">
                                {username}
                                </h3>
                            <p className="profile--about-me-box row d-flex justify-content-center">
                                {aboutMe}
                            </p>
                            {/* {
                                inDebate ?
                                <>
                                    <p className="profile--element d-flex justify-content-center row">You are in a debate as</p>
                                    <p className="profile--element d-flex justify-content-center row"> {role}</p>
                                </>
                                :
                                    <p className="profile--element d-flex justify-content-center">You are not in a debate</p>
                            } */}
                            <h1 className="profile--firstname-element profile--element row d-flex justify-content-center">Firstname: {firstName}</h1>
                            <div className="profile--lastname row d-flex justify-content-center">
                                <h1 className="profile--lastname-element profile--element d-flex justify-content-center">Lastname: {lastName}</h1>
                            </div>
                            <div className="profile--birthday row d-flex justify-content-center ">
                                <h1 className="profile--birthday-element profile--element d-flex justify-content-center">Birthday: {bDay}</h1>
                            </div>
                            <div className="profile--email row d-flex justify-content-center">
                                <h1 className="profile--email-element profile--element d-flex justify-content-center">Email: {email}</h1>
                            </div>
                            <div className="profile--edit row d-flex justify-content-center">
                                <Link to="/edit-profile" className="profile--edit-element col-4 text-center d-flex justify-content-center"><h3>Edit Profile</h3></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        :
        <>
            <div className="profile--base base text-center">
                    <div className="profile--container-error container bg-light text-center d-flex align-items-center justify-content-center">
                        <h1 className="profile--not-logged-in">
                            Log in first, to access this page
                        </h1>
                    </div>
            </div>
        </>
    }
    </>
  )
}

export default Profile
