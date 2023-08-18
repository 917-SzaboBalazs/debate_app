import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../axios'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

import './EditProfile.css';

function EditProfile({ loggedIn }) {
    const { t } = useTranslation();
    const [ newUserName, setNewUserName ] = useState('');
    const [ newFirstName, setNewFirstName ] = useState('');
    const [ newLastName, setNewLastName ] = useState('');
    const [ newBirthday, setNewBirthday ] = useState('');
    const [ newEmail, setNewEmail ] = useState('');
    const [ newAboutMe, setNewAboutMe ] = useState('');

    const [ loading, setLoading ] = useState(true);

    let navigate = useNavigate();

    useEffect(() => {

        axiosInstance
          .get('user/current/')
          .then((res) => {
            setNewUserName(res.data.username);
            setNewFirstName(res.data.first_name);
            setNewLastName(res.data.last_name);
            setNewBirthday(res.data.birthday);
            setNewEmail(res.data.email);
            setNewAboutMe(res.data.about_me);

            setLoading(false);
          })
          .catch((err) => {
            
            setLoading(false);
          });

      }, []);

  if (loading) {
    return <div className="edit--base base"><div className="edit--container container fade-in"></div></div>
  }

  return (
    <>
        <div className="edit--base base">
            <div className="edit--container container fade-in">
                {
                    loggedIn ?
                    <>
                        <div className="edit--title row text-center">
                            <h1 className="col-12">{t("editProfile.title")}</h1>
                        </div>
                        <div className="edit--firstname edit--element row">
                            <h1 className="edit--firstname-text col-md-5 col-sm-12">{t("editProfile.firstname")} </h1>
                            <input
                                type="text"
                                className="edit--firstname-input col-md-7 col-sm-12"
                                value={newFirstName}
                                onChange={(e) => {
                                    setNewFirstName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="edit--lastname edit--element row">
                            <h1 className="edit--lastname-text col-md-5 col-sm-12">{t("editProfile.lastname")}</h1>
                            <input
                                type="text"
                                className="edit--lastname-input col-md-7 col-sm-12"
                                value={newLastName}
                                onChange={(e) => {
                                    setNewLastName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="edit--birthday edit--element row">
                            <h1 className="edit--birthday-text col-md-5 col-sm-12">{t("editProfile.birthday")}</h1>
                            <input
                                type="date"
                                className="edit--birthday-input col-md-7 col-sm-12"
                                value={newBirthday}
                                onChange={(e) => {
                                    setNewBirthday(e.target.value);
                                }}
                            />
                        </div>
                        <div className="edit--email edit--element row">
                            <h1 className="edit--email-text col-md-5 col-sm-12">{t("editProfile.email")}</h1>
                            <input
                                type="email"
                                className="edit--email-input col-md-7 col-sm-12"
                                value={newEmail}
                                onChange={(e) => {
                                    setNewEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className="edit--aboutme edit--element row">
                            <h1 className="edit--aboutme-text col-md-5 col-sm-12">{t("editProfile.aboutMe")} </h1>
                            <textarea
                                className="col-md-7 col-sm-12"
                                value={newAboutMe}
                                onChange={(e) => {
                                    setNewAboutMe(e.target.value);
                                }}
                            />
                        </div>
                            <div className="profile--edit row d-flex justify-content-center">
                                <Link to="/profile" className="profile--edit-element col-4 text-center d-flex justify-content-center">
                                    <h3 onClick={() => {
                                    axiosInstance
                                        .patch('user/current/', {
                                                'username': newUserName,
                                                'first_name': newFirstName,
                                                'last_name': newLastName,
                                                'birthday': newBirthday,
                                                'email': newEmail,
                                                'about_me': newAboutMe
                                                })
                                        .then((res) => {
                                            navigate('/profile')
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        })
                                }}>{t("editProfile.save")}</h3>
                                    </Link>
                            </div>


                    </>
                    :
                    <>
                        { <div className="edit--error-row row d-flex  align-items-center justify-content-center text-center">
                            <h1 className="edit--error-element col-8">{t("editProfile.404")}</h1>
                            </div> }
                    </>
                }
            </div>
        </div>
    </>
  )
}

export default EditProfile
