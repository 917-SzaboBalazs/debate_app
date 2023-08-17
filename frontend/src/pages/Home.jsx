import React, { useEffect } from 'react';
import Trunk from '../components/Trunk/Trunk'
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';


import '../App.css'

function Home({ loggedIn, inDebate, setInDebate, status, setStatus }) {
  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname);
  }, [location.pathname]);
  return (
      <div className="base">
        <Trunk loggedIn={loggedIn} inDebate={inDebate} setInDebate={setInDebate} status={status} setStatus={setStatus} />
      </div>
  )
}

export default Home