import { useState } from "react"

export default function Input({input, setInput, num, setNum, handleSend, handleInputKeyDown, loading }) {
    return (
        <div id="input" className="flex gap-4 w-full justify-center bg-white p-4 rounded-xl">
            <div className="flex flex-col justify-start items-start gap-1">
                <h2 className="mb-1"><span className="text-[#595752]">Target Sector/Startup Idea</span> <span className="text-red-500">(*required)</span></h2>
                <textarea id='user_input' value={input}name="user_input" onChange={e => setInput(e.target.value)} onKeyDown={handleInputKeyDown} rows="3" cols="100" className='bg-white resize-none text-[#99968F] p-1 w-full border-2 border-[#99968F] rounded-xl' placeholder="Examples: Quantum computing, neutral-atom hardware, solar engines, etc." />
            </div>

            <div className='flex flex-col gap-1'>
                <h2 className="text-[#595752]">Number of Ideas</h2>
                <div className="flex flex-row gap-2">
                    {
                        Array.from({ length: 5 }, (_, i) => i + 1).map((number) => (
                            <button key={number} className={`select-none cursor-pointer p-1 px-3 rounded-xl border-1 border-[#595752] transition-all duration-200 ease-out hover:scale-105 ${num==number ? "bg-white text-black" : "bg-black text-white"}`} onClick={()=>{setNum(number);}}>{number}</button>
                        ))
                    }
                </div>
                <button disabled={loading} className="bg-gradient-to-r from-sky-500 to-[#5FCF9A] text-white font-semibold rounded p-1 cursor-pointer transition-all duration-200 ease-out hover:scale-105"
                onClick={(e)=>{e.preventDefault(); handleSend();}}>
                    <span className="select-none flex w-full bg-gray-900 text-white rounded p-2 justify-center">
                        Generate Report
                    </span>
                </button>
            </div>
        </div>
    )
}