import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import CreateDebate from '../Popups/CreateDebate/CreateDebate';
import JoinDebate from '../Popups/JoinDebate/JoinDebate';

import handleClickTriggerCreate from '../Functions/handleClickCreate';
import getUserCurrent from '../Functions/getUserCurrent';
import leaveDebate from '../Functions/leaveDebate';

import axiosInstance from '../../axios';

import { Link } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector/LanguageSelector.js';
import { useTranslation } from 'react-i18next'
import i18n from "../../i18n";

// import './Navbar.css';
import './Navbar2.css';

import Logo from '../../images/logo.svg';

function CreateDebateComponent(props) {
  const { loggedIn, navigate, setInDebate, setStatus, closeMenu } = props;
  const { t } = useTranslation();

  if (loggedIn) {
    return (
      <Nav.Link 
        onClick={async () => { 
          closeMenu();
          await handleClickTriggerCreate(navigate, setInDebate, setStatus);
        }}
        className='nav-link yellow-text'>{t("menu.create")}
      </Nav.Link>
    )
  }

  return(<></>)
}

function CollapsibleExample({ loggedIn, setLoggedIn, inDebate, setInDebate, status, setStatus, username, setUsername, windowWidth }) {
    let navigate = useNavigate();

    const [ triggerCreate, setTriggerCreate ] = useState(false);
    const [ triggerJoin, setTriggerJoin ] = useState(false);
    const [ menuOpen, setMenuOpen ] = useState(false);
    const { t } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const location = useLocation();

    useEffect(() => {
      document.body.addEventListener('click', (e) => {
          if (e.y > 67) {
            setMenuOpen(false);
          }
        });
    }, []);

    useEffect(() => {
      closeMenu();
    }, [location, selectedLanguage]);

    const handleClickTriggerJoin = () => {
      setTriggerJoin(true);
    }

    const logOut = () => {
      closeMenu();

      axiosInstance
        .post('user/logout/blacklist/', {
  			refresh_token: localStorage.getItem('refresh_token'),
  		})
        .then((res) => {
          localStorage.removeItem('access_token');
      		localStorage.removeItem('refresh_token');
      		axiosInstance.defaults.headers['Authorization'] = null;

          setLoggedIn(false);

          navigate('/');
      })
        .catch((err) => {
        })
    };
    

  const closeMenu = () => { setMenuOpen(false); window.scrollTo(0, 0) };
  const toggleMenu = () => setMenuOpen(menuOpen === "expanded" ? false : "expanded");
  

    const toggleLanguage = () => {
        const newLanguage = selectedLanguage === "en" ? "hu" : "en";
        i18n.changeLanguage(newLanguage);
        setSelectedLanguage(newLanguage);
        localStorage.setItem("lang", newLanguage);
        const pathname = window.location.pathname;
        console.log(pathname)
        if(pathname === '/judges-drag'){
          window.location.reload()
        }
    }

  const selectLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
    setSelectedLanguage(newLanguage);
    localStorage.setItem("lang", newLanguage);
    const pathname = window.location.pathname;
    console.log(pathname)
    if(pathname === '/judges-drag'){
      window.location.reload()
    }
  }

  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="primary" className='nav fade-in' expanded={menuOpen}>
      <Container>
        <Navbar.Brand as={Link} to="/" className='nav-brand'><img src={Logo} className='nav--logo' onClick={closeMenu}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" color='white' onClick={toggleMenu} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/about-us" className='nav-link' onClick={closeMenu}>{t("menu.About")}</Nav.Link>
          {/* <Nav.Link as={Link} to="/debates" className='nav-link' onClick={closeMenu}>{t("menu.Debates")}</Nav.Link> */}
          <Nav.Link as={Link} to="/blog" className='nav-link' onClick={closeMenu}>{t("menu.Blog")}</Nav.Link>

            {
              !inDebate ?
              <>
                {loggedIn && <Nav.Link onClick={handleClickTriggerJoin} className='nav-link yellow-text'>{t("menu.join")}</Nav.Link> }
                <CreateDebateComponent loggedIn={loggedIn} setInDebate={setInDebate}  navigate={navigate} closeMenu={closeMenu} setStatus={setStatus} />
              </>
              :
              <>
                {loggedIn && <Nav.Link as={Link} to={status} className='nav-link yellow-text' onClick={closeMenu}>{t("menu.current")}</Nav.Link>}
                {loggedIn && <Nav.Link onClick={
                  () => {
                  closeMenu();
                  leaveDebate(setInDebate, setStatus, navigate);
                  }} className='nav-link yellow-text'>{t("menu.leave")}</Nav.Link>}
              </>
            }
            </Nav>
            <Nav>
            { !loggedIn ?
                <>
                  <Nav.Link as={Link} to="/log-In" className='nav-link' onClick={closeMenu}>{t("menu.logIn")}</Nav.Link>
                  <Nav.Link as={Link} to="/sign-up" className='nav-link' onClick={closeMenu}>{t("menu.signUp")}</Nav.Link>
                </>
                :
                <>
                  <Nav.Link as={Link} to="/profile" className='nav-link' onClick={closeMenu}>
                    <i className="nav-profile-icon">&#xf007;</i>
                    {username}
                    </Nav.Link>
                  <Nav.Link onClick={logOut}>{t("menu.logout")}</Nav.Link>
                  
                </>
            }
            <LanguageSelector selectedLanguage={selectedLanguage} toggleLanguage={toggleLanguage} selectLanguage={selectLanguage} windowWidth={windowWidth} />
          </Nav>
          
          <CreateDebate loggedIn={loggedIn} trigger={triggerCreate} setTrigger={setTriggerCreate} />
          <JoinDebate loggedIn={loggedIn} trigger={triggerJoin} setTrigger={setTriggerJoin} setInDebate={setInDebate} closeMenu={closeMenu} status={status} setStatus={setStatus}/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default CollapsibleExample;
