import React from 'react'
import { useLocation } from 'react-router-dom';

import './NewDebate.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function NewDebate() {
    const location = useLocation();

  return (
    <div className='new-debate--background'>
        <div className="new-debate--container container ">
            <h1 className='new-debate--basic-text col-sm-12 text-center p-4'>Debate-type: {location.state.type}</h1>

            <div className="new-debate--people row justify-content-evenly">
                {}
            </div>

            <div className="new-debate--decision row justify-content-evenly">
                <div className="new-debate--decision--pro col-sm-4 col-md-4"></div>
                <div className="new-debate--decision--con col-sm-4 col-md-4"></div>
            </div>

            <div className="new-debate--teams row justify-content-evenly">
                {}
            </div>
        </div>
    </div>
  )
}

export default NewDebate