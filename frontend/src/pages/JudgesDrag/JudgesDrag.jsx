import React from 'react'
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import './JudgesDrag.css'
import { all } from 'axios';

function JudgesDrag() {
    const [ winnerTeam, setWinnerTeam ] = useState('Nem lehet tudni, az egyik dev elbaszott valamit')
    
    

    function handleOnDrag(e, teamName){
        e.dataTransfer.setData("widgetType", teamName);
        console.log("Dragging " + teamName)
    }

    function handleOnDropPlaces(e, placeName, orderName){
        const teamName = e.dataTransfer.getData("widgetType");
        e.dataTransfer.setData("widgetType", teamName);
        console.log("Dropping " + teamName)

        const dropPlace = document.getElementById(placeName);
        dropPlace.innerHTML = orderName + " place:\n" + teamName;
    }

    function handleDoneClick(e){
        const first = document.getElementById('first-place').innerHTML;
        const second = document.getElementById('second-place').innerHTML;
        const third = document.getElementById('third-place').innerHTML;
        const fourth = document.getElementById('fourth-place').innerHTML;

        const all_text = first + second + third + fourth;

        const teams = ["OG", "OO", "CG", "CO"];

        for(let i=0;i<4;i++){
            if(!all_text.includes(teams[i])){
                alert("You did not include the " + teams[i] + " team...");
                return;
            }
        }

        alert("Alrighty!")
    }

    function handleDragOver(e){
        e.preventDefault();
    }
    

  return (
    
    <div className='judges-drag--base'>
                <div id="jd_textholder"><h3 id="jd_choose_order">Válaszd ki a győztes sorrendet!</h3></div>
                <div className="jd_ordered-holder" id="jd_ordered-holder">
                    <div id="first-place" className="jd_ordering-places" 
                        onDragOver={handleDragOver} onDrop={(e) => handleOnDropPlaces(e, "first-place", "First")}>Frist place</div>
                    <div id="second-place" className="jd_ordering-places" 
                        onDragOver={handleDragOver} onDrop={(e) => handleOnDropPlaces(e, "second-place", "Second")}>Second place</div>
                    <div id="third-place" className="jd_ordering-places" 
                        onDragOver={handleDragOver} onDrop={(e) => handleOnDropPlaces(e, "third-place", "Third")}>Third place</div>
                    <div id="fourth-place" className="jd_ordering-places" 
                        onDragOver={handleDragOver} onDrop={(e) => handleOnDropPlaces(e, "fourth-place", "Fourth")}>Fourth place</div>
                </div>

                <div className="jd_team-holder">
                    <div    className="jd_team" 
                            id="og" 
                            draggable
                            onDragStart={(e) => handleOnDrag(e, "OG")}>
                                Opening Government
                    </div>
                    <div    className="jd_team" 
                            id="oo" 
                            draggable
                            onDragStart={(e) => handleOnDrag(e, "OO")}>
                                Opening Opposition
                    </div>
                    <div    className="jd_team" 
                            id="cg" 
                            draggable
                            onDragStart={(e) => handleOnDrag(e, "CG")}>
                                Closing Government
                    </div>
                    <div    className="jd_team" 
                            id="co" 
                            draggable
                            onDragStart={(e) => handleOnDrag(e, "CO")}>
                                Closing Opposition
                    </div>
                </div>
                <div id="jd_buttonholder">
                <div    className="jd_button" 
                            id="jd_redo" 
                            draggable
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
