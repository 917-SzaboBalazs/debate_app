import React from 'react'
import { useState, useEffect } from 'react'
import PoiGetRequest from '../InDebateTimer/functions/PoiRequest'

import './Test.css'

function TesterPage() {

    const [ poi, setPoi ] = useState(false);
    const [ poiSeconds, setPoiSeconds ] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            setPoiSeconds(s => {
                if (s > 0) {
                    return s - 1;
                }
                return s;
            });

            if (poiSeconds === 0) {
                setPoi(false);
            }
            // console.log(poiSeconds);
        }, 1000);

        return () => clearInterval(interval); 
    }, [poiSeconds])

  return (
    <div className="test-container">
        {
            poi ? 
            <>
                <p className="test-timer">
                    <span className="test-seconds">{poiSeconds}</span>
                </p>
            </>
            : 
            <>
                <button 
                    className="poi-button"
                    onClick={() => {
                        setPoi(true);
                        setPoiSeconds(10);
                    }}
                >
                    POI
                </button>
            </>
        }
    </div>
  )


}

export default TesterPage