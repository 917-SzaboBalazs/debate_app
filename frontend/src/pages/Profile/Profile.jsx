import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

import './Profile.css';

import face1 from '../../images/faces/face1.svg';

function Profile({ loggedIn }) {
    const { t } = useTranslation();
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ bDay, setbDay ] = useState('');
    const [ aboutMe, setAboutMe ] = useState('');
    const [ username, setUserName ] = useState('');
    
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {

        axiosInstance
          .get('user/current/')
          .then((res) => {
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setEmail(res.data.email);
            setbDay(res.data.birthday);
            setAboutMe(res.data.about_me);
            setUserName(res.data.username);

            setLoading(false);

          })
          .catch((err) => {
            setLoading(false);
          });

      }, []);

   if (loading) {
        return <div className="profile--base base "><div className="container"></div></div>
   }

  return (
    <>
    {
        loggedIn ?
        <>
            <div className="profile--base base ">
                <div className="container">
                    <div className="profile--container d-flex justify-content-center fade-in">
                        <div className="profile--base-row justify-content-center align-items-center">
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
                                <h1 className="profile--firstname-element profile--element row d-flex justify-content-center">{t("profile.firstname")}{firstName}</h1>
                                <div className="profile--lastname row d-flex justify-content-center">
                                    <h1 className="profile--lastname-element profile--element d-flex justify-content-center">{t("profile.lastname")}{lastName}</h1>
                                </div>
                                <div className="profile--birthday row d-flex justify-content-center ">
                                    <h1 className="profile--birthday-element profile--element d-flex justify-content-center">{t("profile.birthday")}{bDay}</h1>
                                </div>
                                <div className="profile--email row d-flex justify-content-center">
                                    <h1 className="profile--email-element profile--element d-flex justify-content-center">{t("profile.email")}{email}</h1>
                                </div>
                                <div className="profile--edit row d-flex justify-content-center">
                                    <Link to="/edit-profile" className="profile--edit-element col-4 text-center d-flex justify-content-center"><h3>{t("profile.edit")}</h3></Link>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        :
        <>
            {/*<div className="profile--base base text-center">
                    <div className="profile--container-error container bg-light text-center d-flex align-items-center justify-content-center">
                        <h1 className="profile--not-logged-in">
                            Log in first, to access this page
                        </h1>
                    </div>
            </div>*/ }
        </>
    }
    </>
  )
}

export default Profile
