import React from 'react'
import axiosInstance from '../../../axios'
import handleMotion from '../Functions/handleMotion'
import { useTranslation } from 'react-i18next'

function RandomMotionSetter({ setMotion, currRole }) {
    const { t } = useTranslation();

    const handleSetRandom = () => {
        axiosInstance
            .get('motion/random/')
            .then((res) => {
                const lang = localStorage.getItem('lang')
                if (lang === 'en')
                {
                    handleMotion(res.data.text_in_english);
                    setMotion(res.data.text_in_english);
                }
                else
                {
                    handleMotion(res.data.text_in_hungarian);
                    setMotion(res.data.text_in_hungarian);
                }
                
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

            {currRole === 'judge' ? 
                <div 
                    className="col-12 new-debate--motion-random-col text-center"
                    onClick={handleSetRandom}
                >
                    <div className="new-debate--button new-debate--motion-random-text">
                    {t('randomMotion')}
                    </div>
                </div>
            :
                <div 
                    className="col-12 new-debate--motion-random-col text-center"
                >
                    <div className="new-debate--button new-debate--motion-random-text new-debate--button-disabled">
                    {t('randomMotion')}
                    </div>
                </div>
            }
        </div>
    )
}

export default RandomMotionSetter;