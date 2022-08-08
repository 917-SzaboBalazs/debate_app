import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';

import './Footer.css'

import fb from '../../images/facebook.png';
import insta from '../../images/insta.png';
import wa from '../../images/WhatsApp.png';


function Footer() {
  return (
    <div className="footer--container">
      <div className="basic-elements">
        <div className="basic-elements--1">
          <img src="" alt="" className="footer--logo" />
          <div className="footer--logo-elements">
            <p className='contact'><u>Conact us at:</u> </p>
            <a href="https://www.facebook.com"><img src={fb} alt="Facebook" className="logo facebook" /></a>
            <a href="https://www.instagram.com" ><img src={insta} alt="Instagramm" className="logo insta" /></a>
            <a href="https://www.WhatsApp.com"><img src={wa} alt="WhatsApp" className="logo whatsapp" /></a>
            <ul>
              <li><p> Phone: (+40) 774 234 534 </p></li>
              <li><p> Adress: Romania, Cluj, Cluj-Napoca, Iuliu-Maniu 6.</p></li>
            </ul>
          </div>
          <div className="privacy-policy">
            <p className='contact'><u>Privacy Policy:</u></p>
            <ul>
              <li>Ne légy buzi</li>
              <li>de ha megis, az sem baj</li>
              <li>szia Attila</li>
              <li>szia Anna</li>
              <li>szia Ákos</li>
              <li>szia Balázs</li>
            </ul>
          </div>
        </div>
        <div className="footer--log">
            <Button
                to="log-In"
                className='btns'
                buttonStyle='btn--outline'
                buttonSize='btn--large'
            >
                Log-In
            </Button>
            <Button
                to="sign-up"
                className='btns'
                buttonStyle='btn--primary'
                buttonSize='btn--large'
            >
                Sign-Up
            </Button>
        </div>
      </div>
      <div className="lower-tag">
        @Sérülésekért nem vállalunk felelősséget
      </div>
    </div>
  )
}

export default Footer