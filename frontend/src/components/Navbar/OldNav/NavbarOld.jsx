import React from 'react';
import { Button } from "../Button/Button";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CreateDebate from './Popups/CreateDebate/CreateDebate';

import './Navbar.css';

function Navbar() {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [createDebate, setCreate] = useState(false);

  useEffect(() => {
    showButton();
  }, []);

  const handleClick = () => {
    setClick(!click);
  }

  const closeMobileMenu = () => {
    setClick(false);
  }

  const showButton = () => {
    if (window.innerWidth < 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  }

  window.addEventListener('resize', showButton);

  const handleClickCreate = () => {
    setCreate(true);
  }

  return (
    <nav className='navbar'>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={handleClick}>
                LogO <i className='fab fa-typo3' />
            </Link>
          <div className="menu-icons" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item' onClick={closeMobileMenu}>
                <Button 
                    to="debates"
                    buttonSize="btn--medium"
                >
                  Debates
                </Button>
              </li>
              <li className='nav-item' onClick={closeMobileMenu}>
                <button className="nav-links" onClick={handleClickCreate}
              >
                Create a Debate
              </button>
              </li>
              <li  className='nav-item' onClick={closeMobileMenu}>
                <Button
                  className='nav-links'
                  to="join-a-debate"
                >
                  Join a Debate
                </Button>
              </li>
              <li  className='nav-item' onClick={closeMobileMenu}>
                <Button
                  className='nav-links'
                  to="about-us"
                >
                  About Us
                </Button>
              </li>
          </ul>
          <CreateDebate trigger={createDebate} setTrigger={setCreate}/>
        </div>
    </nav>
  )
}

export default Navbar