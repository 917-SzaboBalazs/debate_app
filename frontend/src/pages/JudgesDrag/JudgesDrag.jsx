import React from 'react'
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import './JudgesDrag.css'
import { all } from 'axios';

function JudgesDrag() {

    function handleRedo(e){
        const og = document.getElementById('og');
        const oo = document.getElementById('oo');
        const co = document.getElementById('co');
        const cg = document.getElementById('cg');

        const first = document.getElementById('first-place');
        const second = document.getElementById('second-place');
        const third = document.getElementById('third-place');
        const fourth = document.getElementById('fourth-place');

        og.style.backgroundColor = '#ffffffad';
        oo.style.backgroundColor = '#ffffffad';
        cg.style.backgroundColor = '#ffffffad';
        co.style.backgroundColor = '#ffffffad';

        first.innerHTML = 'First place';
        second.innerHTML = 'Second place';
        third.innerHTML = 'Third place';
        fourth.innerHTML = 'Fourth place';

        const text = document.getElementById('jd_choose_order');
        text.innerHTML = 'Válaszd ki a(z) <span id="jd_choose_place">első</span> helyezettet!'
    }

    function handleClick(e, place){
        const current_place = document.getElementById("jd_choose_place");

        const backgroundColor = window.getComputedStyle(e.currentTarget).backgroundColor;

        if (backgroundColor !== 'rgba(255, 255, 255, 0.68)'){
            return;
        }
        
        if (current_place.innerHTML === 'első'){
            current_place.innerHTML = 'második';
            const first = document.getElementById('first-place');
            first.innerHTML = place;
        } else if (current_place.innerHTML === 'második'){
            current_place.innerHTML = 'harmadik';
            const second = document.getElementById('second-place');
            second.innerHTML = place;
        } else if (current_place.innerHTML === 'harmadik'){
            current_place.innerHTML = 'negyedik';
            const third = document.getElementById('third-place');
            third.innerHTML = place;
        } else if (current_place.innerHTML === 'negyedik'){
            current_place.innerHTML = '';
            const fourth = document.getElementById('fourth-place');
            fourth.innerHTML = place;
            const full_sentence = document.getElementById('jd_choose_order');
            full_sentence.innerHTML = 'Felállítottad a sorrendet'
        }

        e.currentTarget.style.backgroundColor = 'rgb(80,80,80)';
    }
    

  return (
    
    <div className='judges-drag--base'>
                <div id="jd_textholder"><h3 id="jd_choose_order">Válaszd ki a(z) <span id="jd_choose_place">első</span> helyezettet!</h3></div>
                <div className="jd_ordered-holder" id="jd_ordered-holder">
                    <div id="first-place" className="jd_ordering-places" 
                        >Frist place</div>
                    <div id="second-place" className="jd_ordering-places" 
                        >Second place</div>
                    <div id="third-place" className="jd_ordering-places" 
                        >Third place</div>
                    <div id="fourth-place" className="jd_ordering-places" 
                        >Fourth place</div>
                </div>

                <div className="jd_team-holder">
                    <div    className="jd_team" 
                            id="og" 
                            onClick={(e) => handleClick(e, 'Opening Government')}
                            >
                                Opening Government
                    </div>
                    <div    className="jd_team" 
                            id="oo" 
                            onClick={(e) => handleClick(e, 'Opening Opposition')}>
                                Opening Opposition
                    </div>
                    <div    className="jd_team" 
                            id="cg" 
                            onClick={(e) => handleClick(e, 'Closing Government')}>
                                Closing Government
                    </div>
                    <div    className="jd_team" 
                            id="co" 
                            onClick={(e) => handleClick(e, 'Closing Opposition')}>
                                Closing Opposition
                    </div>
                </div>
                <div id="jd_buttonholder">
                <div    className="jd_button" 
                            id="jd_redo" 
                            onClick={(e) => handleRedo(e)}
                            >
                                Ujrahelyezes
                    </div>
                    <div    className="jd_button" 
                            id="jd_sub" 
                            draggable
                            >
                                Submit
                    </div>
                </div>

                {/* <div id="done-btn" onClick={handleDoneClick}>DONE</div> */}

    </div>
  )
}

export default JudgesDrag
