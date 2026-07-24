// https://github.com/payalgit933/chatbot/blob/main/src/

import { useState, useEffect } from 'react'
import './App.css'
import { Vanta } from 'vanta-react'
import Header from "./components/Header"
import Input from "./components/Input"
import Response from "./components/Response"

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [input, setInput] = useState('');
  const [userMessage, setMsg] = useState('');
  const [num, setNum] = useState(3);
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    // parse whitespace
    if (!input.trim()) {
        // console.log(input);
        setError("No input detected!");
        console.log(error);
        return;
    }
    setInput(input.trim());

    
    setMsg(input);
    const userMessage = input;
    const userNum = num;
    setInput('');
    setChat(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, num: userNum }),
      });
      const data = await res.json();
      console.log(data.base) // yay printed
      if (data.base) {
        setChat(data.base);
      } else if (data.error) {
        setError(data.error);
        setChat({ role: 'ai', content: "Error: " + data.error });
      }
    } catch {
      setError('Failed to connect to server.');
      setChat({ role: 'ai', content: "Error: Failed to connect to server." });
    }
    setLoading(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading) handleSend();
    }
  };
  
  useEffect(() => {
    const savedChat = localStorage.getItem('chatHistory');
    if (savedChat) {
      setChat(JSON.parse(savedChat));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chat));
  }, [chat]);

  return (
    <main className='bg-[#1A302ACC]'>
      {/* <Vanta
        effect="net"
        background={true}
        options={{
          color: 0x5FCF9A,
          points: 16.00,
          maxDistance: 30.00,
          spacing: 16.00,
        }}
      /> */}
      
      {/* header */}
      <Header className="z-100" />

      {/* main */}
      <div className="flex flex-col gap-4 p-8 w-full z-1">
        <Input input={input} setInput={setInput} num={num} setNum={setNum} handleSend={handleSend} handleInputKeyDown={handleInputKeyDown} loading={loading} />

        <div className="flex flex-col justify-center items-center">
          {
            loading && 
            <button type="button" className="inline-flex  items-center rounded-md px-6 py-4 leading-6 font-semibold text-[#5FCF9A] transition duration-150 ease-in-out hover:bg-indigo-400 w-min justify-center m-8 text-3xl font-playfair" disabled="">
              <svg className="mr-3 -ml-1 size-7 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
              </button>
          }

          { !loading &&
            <div className="flex flex-col gap-4 w-full">
              <h2 className="text-xl">Generated Reports For: <span className='text-[#5FCF9A]'>{userMessage.toUpperCase()}</span></h2>

              { Array.from(chat).map((item, i) => 
                  <Response key={i} item={item} />
                )
              }
            </div>
          }
        </div>

        {/* footer */}
        <p className="font-playfair">SEED Cohort 2026 -- Powered by Google Gemini</p>
      </div>
    </main>
  )
}

export default App
