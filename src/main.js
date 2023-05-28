import React from "react";
import Die from "./die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./index.css"

export default function Main(){ 
    const [dicey, setDicey] = React.useState(allNewDice())

    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(()=>{
        const allHeld = dicey.every(diceValue => diceValue.isHeld)
        const firstValue = dicey[0].value
        const allSameValue = dicey.every(diceValue => diceValue.value === firstValue)
        if ( allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dicey])
        let button = tenzies ? "New Game": "Roll"
    function generateNewDie(){
        return{
                
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
}
    function allNewDice(){
        const newDice= []
        for (let i = 0; i < 10; i++){
            newDice.push(generateNewDie())
        }
        
        return newDice
    }
  

        function rollDice(){
            if (!tenzies){
                setDicey(prevDicey => prevDicey.map(diceValue => {
                return diceValue.isHeld ?
                diceValue:
                generateNewDie()
            }))
            }
            else{
                window.location.reload();
            }
            
        }

        function holdDice(id){
            setDicey(prevDicey => prevDicey.map(diceValue => {
                return diceValue.id === id ?
                {...diceValue, isHeld: !diceValue.isHeld}:
                diceValue
            }))
        }

    const diceElement = dicey.map(diceValue =>
        <Die
         key= {diceValue.id}
         value={diceValue.value}
         isHeld={diceValue.isHeld}
         holdDice={()=> holdDice(diceValue.id)}
         />
    )
    return(
        <div className="main">
            {tenzies && <Confetti/>}
            <div className="text-box">
                <h1 className="text-head">Tireni</h1>
                <p className="text-body">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="dice-container">
            {diceElement}
            </div>
            <button className="roll" onClick={rollDice}>{button}</button>
        </div>
    )
}