import { useState } from 'react';

export default function ModeBar() {
    const [mode, setMode] = useState("word")
    const [value, setValue] = useState(30)
    const [player, setPlayer] = useState("single")

    function changeMove(mode: string){
        setMode(mode);
    }

    function changeValue(n: number){
        setValue(n);
    }

    function changePlayer(player: string){
        setPlayer(player);
    }

    return (
        <div className='w-full-[75%] flex justify-center items-center bg-[#141A24] '>
            <button onClick = {() =>changeMove("time")} className={`rounded-[0rem] font-bold text-2xl ${mode == "time" ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}>Time</button>
            <button onClick = {() =>changeMove("word")} className={`rounded-[0rem] font-bold text-2xl ${mode == "word" ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}>Word</button>
            <div className= 'rounded-full bg-[#0B0E13] w-3 h-10'></div>
            <button onClick = {() =>changeValue(15)} className={`rounded-[0rem] font-bold text-2xl ${value == 15 ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5 whitespace-normal`}>{mode == "time"? "  15  ": "Easy"}</button>
            <button onClick = {() =>changeValue(30)} className={`rounded-[0rem] font-bold text-2xl ${value == 30 ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}>{mode == "time"? 30: "Medium"}</button>
            <button onClick = {() =>changeValue(45)} className={`rounded-[0rem] font-bold text-2xl ${value == 45 ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}>{mode == "time"? 45: "Hard"}</button>
            <div className= 'rounded-full bg-[#0B0E13] w-3 h-10'></div>
            <button onClick = {() =>changePlayer("single")} className={`rounded-[0rem] font-bold text-2xl ${player == "single" ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}>Single Player</button>
            <button onClick = {() =>changePlayer("multi")} className={`rounded-[0rem] font-bold text-2xl ${player == "multi" ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}>Multiplayer</button>
        </div>
    )
}