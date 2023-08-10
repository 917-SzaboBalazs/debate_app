import React from 'react'
import axiosInstance from '../../../axios'
import handleMotion from '../Functions/handleMotion'

function RandomMotionSetter({ setMotion }) {

    const handleSetRandom = () => {
        axiosInstance
            .get('motion/random/')
            .then((res) => {
                handleMotion(res.data.text_in_english);
                setMotion(res.data.text_in_english);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="row 
                new-debate--motion-random-row
                justify-content-center
                align-items-center
                ">
            <div 
                className="col-12 new-debate--motion-random-col text-center"
                onClick={handleSetRandom}
            >
                <span className="new-debate--motion-random-text">Randomize</span>
            </div>
        </div>
    )
}

export default RandomMotionSetter;