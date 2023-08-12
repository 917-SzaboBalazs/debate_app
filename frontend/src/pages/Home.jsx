import React from 'react'
import Trunk from '../components/Trunk/Trunk'

import '../App.css'

function Home({ loggedIn, inDebate, setInDebate }) {
  return (
      <div className="base">
        <Trunk loggedIn={loggedIn} inDebate={inDebate} setInDebate={setInDebate} />
      </div>
  )
}

export default Home