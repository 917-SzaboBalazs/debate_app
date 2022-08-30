import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../../axios';

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
                <div className="profile--container container bg-light">
                    <div className="profile--base-row row">
                        <div className="profile--left-side col-md-5 col-sm-12">
                            <div className="profile--img row d-flex justify-content-center">
                                <img src={face1} alt="" className="profile--img-element profile-element col-12" />
                            </div>
                            <div className="profile--firstname row">
                                <h1 className="profile--firstname-element profile--element col-12">Firstname: {firstName}</h1>
                            </div>
                            <div className="profile--lastname row">
                                <h1 className="profile--lastname-element profile--element col-12">Lastname: {lastName}</h1>
                            </div>
                            <div className="profile--birthday row">
                                <h1 className="profile--birthday-element profile--element col-12">Birthday: {bDay}</h1>
                            </div>
                            <div className="profile--email row">
                                <h1 className="profile--email-element profile--element col-12">Email: {email}</h1>
                            </div>
                            <div className="profile--edit row">
                                <h3 className="profile--edit-element col-4 text-center"><a href='/edit-profile'>Edit Profile</a></h3>
                            </div>
                        </div>
                        <div className="profile--right-side d-flex flex-row align-items-center justify-content-center col-md-7 col-sm-12">
                            <div className="row m-4">
                                <div className="profile--about-me-row align-self-start profile--right-element row">
                                    <h1 className="profile--about-me-title col-12">About me:</h1>
                                    <p className="profile--about-me-box col-12">
                                        {aboutMe}
                                    </p>
                                </div>
                                <div className="profile--in-debate-row profile--right-element align-self-end row">
                                    {
                                        inDebate ?
                                        <>
                                            <h1 className="col-12">Your are in a debate</h1>
                                            <h1 className="col-12">Role: {role}</h1>
                                        </>
                                        :
                                        <>
                                            <h1 className="col-12">Your are not in a debate</h1>
                                        </>
                                    }
                                </div>
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
                            Jelentkezz be előbb te fegyenc.
                        </h1>
                    </div>
            </div>
        </>
    }
    </>
  )
}

export default Profile
