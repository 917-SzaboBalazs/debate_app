import React from 'react'

import './About-Us.css';
import golyatabor from '../../images/about-us.jpg';
import akos from '../../images/csapat/akos.jpg';
import szabo from '../../images/csapat/szabo.jpg';
import kata from '../../images/csapat/kata.jpg';
import anna from '../../images/csapat/anna.jpg';
import saska from '../../images/csapat/saska.jpg';
import huni from '../../images/csapat/huni.jpg';
import andris from '../../images/csapat/andris.jpg';
import { useTranslation } from 'react-i18next'

function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="about-us--container base">
      <div className="fade-in">
      <h1 className='about-us--title'>{t("aboutUs.headline")}</h1>

        <div className="us--container">
          <img src={golyatabor} alt='our team'></img>
          <p>{t("aboutUs.description")}</p>
        </div>
        
        <h1 className='about-us--title'>{t("aboutUs.team")}</h1>
        <div className='team'>
          <div className='teammember'>
              <img src={szabo} alt='Szabó Balázs'></img>
              <h2>Szabó Balázs</h2>
              <h3>{t("aboutUs.szabo")}</h3>
          </div>
          <div className='teammember'>
              <img src={kata} alt='Simon Katalin'></img>
              <h2>Simon Katalin</h2>
              <h3>{t("aboutUs.kata")}</h3>
          </div>
          <div className='teammember'>
              <img src={anna} alt='Fischer Anna'></img>
              <h2>Fischer Anna</h2>
              <h3>{t("aboutUs.fa")}</h3>
          </div>
          <div className='teammember'>
              <img src={akos} alt='Péter Ákos'></img>
              <h2>Péter Ákos</h2>
              <h3>{t("aboutUs.pa")}</h3>
          </div>
          <div className='teammember'>
              <img src={saska} alt='Magyari-Sáska Attila'></img>
              <h2>Magyari-Sáska Attila</h2>
              <h3>{t("aboutUs.saska")}</h3>
          </div>
          <div className='teammember'>
              <img src={huni} alt='Ács Hunor'></img>
              <h2>Ács Hunor</h2>
              <h3>{t("aboutUs.huni")}</h3>
          </div>
          <div className='teammember'>
              <img src={andris} alt='Bethlendi András'></img>
              <h2>Bethlendi András</h2>
              <h3>{t("aboutUs.andris")}</h3>
          </div>
        </div>
        </div>
      </div>
  )
}

export default AboutUs