import React from "react";
import { useState, useEffect } from "react";

import getUserCurrent from "../Functions/getUserCurrent";

import fb from '../../images/facebook.png';
import insta from '../../images/insta.png';
import wa from '../../images/WhatsApp.png';

import { Link } from "react-router-dom";

import './Footer.css';

export default function Footer() {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ userName, setUserName ] = useState('');
  const [ inDebate, setInDebate ] = useState(false);

  useEffect(() => {
    getUserCurrent(setUserName, setLoggedIn, setInDebate);
  }, [setUserName, setLoggedIn, setInDebate]);


  if (inDebate) {
    return <></>
  }

  return (
    <footer className="page-footer font-small pt-4 my-footer">
    <div className="container  text-center">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase footer--list-tag white-text">Footer Content</h5>
                <p className="white-text">Here you can use rows and columns to organize your footer content.</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase footer--list-tag white-text">Links</h5>
                <ul className="list-unstyled white-text">
                    <li><Link to="/about-us" className="footer--list-link">About Us</Link ></li>
                    <li><Link to="/debates" className="footer--list-link">Debates</Link ></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase  white-text footer--list-tag">Contact Us!</h5>
                <ul className="list-unstyled list-horizontal">
                    <li><Link to="https://www.facebook.com"><img src={fb} alt="Facebook" className="footer--icon footer--facebook" /></Link></li>
                    <li><Link to="https://www.instagram.com" ><img src={insta} alt="Instagramm" className="footer--icon footer--insta" /></Link ></li>
                    <li><Link to="https://www.WhatsApp.com"><img src={wa} alt="WhatsApp" className="footer--icon footer--whatsapp" /></Link></li>
                </ul>
            </div>
        </div>
    </div>

  </footer>
  )
}
