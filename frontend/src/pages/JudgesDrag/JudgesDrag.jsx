import React, { useState } from 'react'
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

import './JudgesDrag.css'

function JudgesDrag({ inDebate }) {
    const navigate = useNavigate();
    const [noPlaced, setNoPlaced] = useState(0);

    const handleSubmit = () => {
        // RESULTS TO JSON
        const result = {
            '1' : document.getElementById('first-place').outerText,
            '2' : document.getElementById('second-place').outerText,
            '3' : document.getElementById('third-place').outerText,
            '4' : document.getElementById('fourth-place').outerText,
        }

        if (!validateData()) {
            return;
        }

        // SEND DATA TO BACKEND AND REDIRECT TO FINISH PAGE
        axiosInstance
            .patch('debate/current/', {
                'result': JSON.stringify(Object.assign({}, result)),
                'status': 'finished',
            })
            .then((res) => {
                navigate('/finished-debate');
            })
            .catch((err) => {
            });
    };

    const validateData = () => {
        if (noPlaced < 4) {
            return false;
        }

        return true;
    }

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

        setNoPlaced(0);
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

        setNoPlaced(noPlaced + 1);

        e.currentTarget.style.backgroundColor = 'rgb(80,80,80)';
    }

  if (!inDebate) {
    return <div className='judges-drag--base'><div className='fade-in'></div></div>
  }

  return (
    
    <div className='judges-drag--base base'>
        <div className="fade-in">
            <div id="jd_textholder"><h3 id="jd_choose_order">Válaszd ki a(z) <span id="jd_choose_place">első</span> helyezettet!</h3></div>
            <div className="jd_ordered-holder" id="jd_ordered-holder">
                <div id="first-place" className="jd_ordering-places" 
                    >First place</div>
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
                        onClick={handleSubmit}
                        >
                            Submit
                </div>
            </div>

            {/* <div id="done-btn" onClick={handleDoneClick}>DONE</div> */}
        </div>
    </div>
  )
}

export default JudgesDrag
