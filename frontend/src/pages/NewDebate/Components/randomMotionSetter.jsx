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
        <div className=" 
                new-debate--motion-random-row
                justify-content-center
                align-items-center
                ">
            <div 
                className="col-12 new-debate--motion-random-col text-center"
                onClick={handleSetRandom}
            >
                <div className="new-debate--button new-debate--motion-random-text">
                   Choose a Random Motion
                </div>
            </div>
        </div>
    )
}

export default RandomMotionSetter;