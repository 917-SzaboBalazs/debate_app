import React from "react"
import './Footer.css';

import fb from '../../images/facebook.png';
import insta from '../../images/insta.png';
import wa from '../../images/WhatsApp.png';


const Footer = () => <footer className="page-footer font-small pt-4 my-footer">
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
                    <li><a href="/about-us" className="footer--list-link">About Us</a></li>
                    <li><a href="/debates" className="footer--list-link">Debates</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase  white-text footer--list-tag">Contact Us!</h5>
                <ul className="list-unstyled list-horizontal">
                    <li><a href="https://www.facebook.com"><img src={fb} alt="Facebook" className="footer--icon footer--facebook" /></a></li>
                    <li><a href="https://www.instagram.com" ><img src={insta} alt="Instagramm" className="footer--icon footer--insta" /></a></li>
                    <li><a href="https://www.WhatsApp.com"><img src={wa} alt="WhatsApp" className="footer--icon footer--whatsapp" /></a></li>
                </ul>
            </div>
        </div>
    </div>

</footer>

export default Footer