import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../axios'
import { Link } from 'react-router-dom';

import './EditProfile.css';

function EditProfile() {
    const [ userName, setUserName ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ aboutMe, setAboutMe ] = useState('');

    const [ newUserName, setNewUserName ] = useState('');
    const [ newFirstName, setNewFirstName ] = useState('');
    const [ newLastName, setNewLastName ] = useState('');
    const [ newBirthday, setNewBirthday ] = useState('');
    const [ newEmail, setNewEmail ] = useState('');
    const [ newAboutMe, setNewAboutMe ] = useState('');

    const [ loggedIn, setLoggedIn ] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {

        axiosInstance
          .get('user/current/')
          .then((res) => {
            console.log(res);
            setLoggedIn(true);
            setUserName(res.data.username);
            setNewUserName(res.data.username);
            setFirstName(res.data.first_name);
            setNewFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setNewLastName(res.data.last_name);
            setNewBirthday(res.data.birthday);
            setNewEmail(res.data.email);
            setAboutMe(res.data.about_me);
            setNewAboutMe(res.data.about_me);
          })
          .catch((err) => {
            setLoggedIn(false);
            console.log(err);
          });

      }, []);

  return (
    <>
        <div className="edit--base base">
            <div className="edit--container container">
                {
                    loggedIn ?
                    <>
                        <div className="edit--title row text-center">
                            <h1 className="col-12">Edit Your Profile!</h1>
                        </div>
                        <div className="edit--firstname edit--element row">
                            <h1 className="edit--firstname-text col-md-5 col-sm-12">Firstname: </h1>
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
                            <h1 className="edit--lastname-text col-md-5 col-sm-12">Lastname: </h1>
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
                            <h1 className="edit--birthday-text col-md-5 col-sm-12">Birthday: </h1>
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
                            <h1 className="edit--email-text col-md-5 col-sm-12">Email: </h1>
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
                            <h1 className="edit--aboutme-text col-md-5 col-sm-12">About me: </h1>
                            <textarea
                                className="col-md-7 col-sm-12"
                                value={newAboutMe}
                                onChange={(e) => {
                                    setNewAboutMe(e.target.value);
                                }}
                            />
                        </div>

                        {/* <Link to='/profile' className="edit--save-button-row row d-flex justify-content-center text-center">
                            <div
                                className="row d-flex justify-content-center text-center"
                                
                            >   
                            <Link to='/profile' >
                                <div className="edit--save-button-element"
                                onClick={() => {
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
                                }}>
                                <p>Save changes</p>
                                </div>
                                </Link>

                            </div>
                            </Link> */}
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
                                }}>Save changes</h3>
                                    </Link>
                            </div>


                    </>
                    :
                    <>
                        <div className="edit--error-row row d-flex  align-items-center justify-content-center text-center">
                            <h1 className="edit--error-element col-8">Be kéne jelentkezni hallode</h1>
                        </div>
                    </>
                }
            </div>
        </div>
    </>
  )
}

export default EditProfile
