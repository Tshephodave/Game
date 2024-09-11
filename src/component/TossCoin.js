import React, { useState, useEffect } from 'react';
import Typical from 'react-typical';
import logo from './4572174117896192.png';
import { playSound } from '../soundUtils'; 

const CoinToss = ({ onTossResult, onStartGame }) => {
  const [tossing, setTossing] = useState(false);
  const [result, setResult] = useState(null);
  const [showStartButton, setShowStartButton] = useState(false);

  useEffect(() => {
    playSound('Stadium Crowd Sound Effect.mp3'); 
  }, []);

  const handleToss = () => {
    setTossing(true);
    setShowStartButton(false);
    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? 'A' : 'B';
      setResult(outcome);
      onTossResult(outcome);
      setTossing(false);
      setShowStartButton(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-6"
         style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/sunlit-soccer-stadium-digital-art-anime-background_1001131-1010.jpg')" }}>
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-white bg-opacity-30 py-4 shadow-md z-10">
        <div className="container mx-auto flex justify-center">
          <img src={logo} alt="Logo" className="h-12" />
        </div>
      </header>

      {/* Main Content */}
      <div className="mt-20 bg-opacity-70 bg-black p-6 rounded-lg">
        <h1 className="text-4xl font-extrabold text-white mb-6">Coin Toss</h1>
        <button
          className={`px-6 py-3 text-lg font-semibold text-white rounded-lg transition-transform transform ${tossing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'} ${tossing ? 'scale-95' : ''}`}
          onClick={handleToss}
          disabled={tossing}
        >
          {tossing ? 'Tossing...' : 'Toss Coin'}
        </button>
        {result && !tossing && (
          <div className="mt-6 text-2xl font-semibold text-white">
            <Typical
              steps={[`Team ${result} won the toss!`, 1500]}
              loop={1}
              wrapper="p"
            />
          </div>
        )}
        {showStartButton && !tossing && (
          <button
            className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 active:bg-green-700 transition-colors"
            onClick={onStartGame}
          >
            Start Game
          </button>
        )}
      </div>
    </div>
  );
};

export default CoinToss;



