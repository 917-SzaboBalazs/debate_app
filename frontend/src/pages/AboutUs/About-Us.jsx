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

function AboutUs() {
  return (
    <>
    <div className="base">
    </div>
    <div className="about-us--container">
      <h1 className='about-us--title'>Kik vagyunk?</h1>

        <div className="us--container">
          <img src={golyatabor} alt='our team'></img>
          <p>Csapatunk a Mathias Corvinus Collegium kolozsvári egyetemi program diákprojektje során jött létre és feladatunk a vitakultúra terjesztése. Fontos számunkra a tájékozódottság és a folytonos tudásbővítés, épp ezért a közös célunk az, hogy segítsünk a felhasználóinknak a logikus gondolatmenet levezetésében, a véleményük kifejtésében, valamint a határozott és meggyőző érvelésben. Úgy gondoljuk, hogy a kritikus és innovatív gondolkodás képessége segíteni fogja a vitázókat abban, hogy az élet minden területén megállják a helyüket.</p>
        </div>
        
        <h1 className='about-us--title'>A Csapat</h1>
        <div className='team'>
          <div className='teammember'>
              <img src={szabo} alt='Szabó Balázs'></img>
              <h2>Szabó Balázs</h2>
              <h3>Backend Fejlesztő</h3>
          </div>
          <div className='teammember'>
              <img src={kata} alt='Simon Katalin'></img>
              <h2>Simon Katalin</h2>
              <h3>Backend Fejlesztő</h3>
          </div>
          <div className='teammember'>
              <img src={anna} alt='Fischer Anna'></img>
              <h2>Fischer Anna</h2>
              <h3>Designer</h3>
          </div>
          <div className='teammember'>
              <img src={akos} alt='Péter Ákos'></img>
              <h2>Péter Ákos</h2>
              <h3>Projektmenedzser</h3>
          </div>
          <div className='teammember'>
              <img src={saska} alt='Magyari-Sáska Attila'></img>
              <h2>Magyari-Sáska Attila</h2>
              <h3>Frontend Fejlesztő</h3>
          </div>
          <div className='teammember'>
              <img src={huni} alt='Ács Hunor'></img>
              <h2>Ács Hunor</h2>
              <h3>Frontend Fejlesztő</h3>
          </div>
          <div className='teammember'>
              <img src={andris} alt='Bethlendi András'></img>
              <h2>Bethlendi András</h2>
              <h3>Mentor</h3>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default AboutUs