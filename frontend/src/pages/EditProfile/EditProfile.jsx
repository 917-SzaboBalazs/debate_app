import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import axiosInstance from '../../axios'

import './EditProfile.css';

function EditProfile() {
    const [ userName, setUserName ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ aboutMe, setAboutMe ] = useState('');

    const [ newUserName, setNewUserName ] = useState('');
    const [ newFirstName, setNewFirstName ] = useState('');
    const [ newLastName, setNewLastName ] = useState('');
    const [ newAboutMe, setNewAboutMe ] = useState('');

    const [ loggedIn, setLoggedIn ] = useState(false);

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
            <div className="edit--container bg-light container">
                {
                    loggedIn ? 
                    <>
                        <div className="edit--title row text-center">
                            <h1 className="col-12">Edit Your Profile!</h1>
                        </div>
                        <div className="edit--username edit--element row">
                            <h1 className="edit--username-text col-md-5 col-sm-12">Username: </h1>
                            <input 
                                type="text" 
                                className="edit--username-input col-md-7 col-sm-12" 
                                value={newUserName}
                                onChange={(e) => {
                                    setNewUserName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="edit--firstname edit--element row">
                            <h1 className="edit--firstname-text col-md-5 col-sm-12">FirstName: </h1>
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
                            <h1 className="edit--lastname-text col-md-5 col-sm-12">LastName: </h1>
                            <input 
                                type="text" 
                                className="edit--lastname-input col-md-7 col-sm-12" 
                                value={newLastName}
                                onChange={(e) => {
                                    setNewLastName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="edit--aboutme edit--element row">
                            <h1 className="edit--aboutme-text col-md-5 col-sm-12">About Me: </h1>
                            <textarea 
                                className="edit--aboutme-input col-md-7 col-sm-12" 
                                value={newAboutMe}
                                onChange={(e) => {
                                    setNewAboutMe(e.target.value);
                                }}   
                            />
                        </div>
                        <div className="edit--save-button-row row d-flex justify-content-center text-center">
                            <div 
                                className="edit--save-button-element col-3"
                                onClick={() => {
                                    axiosInstance
                                        .patch('user/current/', {
                                                'username': newUserName,
                                                'first_name': newFirstName,
                                                'last_name': newLastName,
                                                'about_me': newAboutMe
                                                })
                                        .then((res) => {
                                            alert('gg');
                                            window.location.reload(false);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        })
                                }}
                            >
                                Save
                            </div>
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