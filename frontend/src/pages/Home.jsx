import React from 'react'
import Trunk from '../components/Trunk/Trunk'

import '../App.css'

function Home({ loggedIn, inDebate, setInDebate, status, setStatus }) {
  return (
      <div className="base">
        <Trunk loggedIn={loggedIn} inDebate={inDebate} setInDebate={setInDebate} status={status} setStatus={setStatus} />
      </div>
  )
}

export default Home