import React from "react";
import "./index.css"

export default function Die(props){
   
    const style = {
        backgroundColor: props.isHeld ? "#59E391": "white"
    }
    return (
        <div className="die-box" style={style} onClick={props.holdDice}>
            <h1>{props.value}</h1>
        </div> 
    )
}