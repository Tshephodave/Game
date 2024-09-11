import React, { useState, useEffect } from 'react';
import Player from './component/Player';
import MathQuestion from './component/MathsQuestion';
import { playSound } from './soundUtils';
import { stopAllSounds } from './stopAllsounds';
import LandingPage from './component/Landingpage';
import TossCoin from './component/TossCoin';

const App = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState({ A: 0, B: 0 });
  const [timer, setTimer] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [showResumePopup, setShowResumePopup] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true); // State for showing/hiding the question

  const handleResumeGame = () => {
    playSound('whistle.mp3');
    setShowResumePopup(false);   // Hide the resume popup
    setGamePaused(false);        // Unpause the game
    setTimerRunning(true);       // Resume the timer
    setShowQuestion(true);       // Show the question when resuming
    generateMathQuestion();      // Generate a new question
  };

  const handleTimeout = () => {
    if (gameOver || gamePaused) return; // Prevent action when the game is paused
    
    let nextPlayerId = null;

    if (currentPlayer.id === 0 || currentPlayer.id === 6) {
      playSound('goal.mp3');
      setScore((prevScore) => ({
        ...prevScore,
        [currentPlayer.team === 'A' ? 'B' : 'A']: prevScore[currentPlayer.team === 'A' ? 'B' : 'A'] + 1,
      }));
      showCustomAlert(`Team ${currentPlayer.team === 'A' ? 'B' : 'A'} has a goal!`, 'green-600', 'white');
      setTimerRunning(false);    // Stop the timer
      setShowResumePopup(true);  // Show the resume popup
      setGamePaused(true);       // Pause the game
      setShowQuestion(false);    // Hide the question after a goal is scored
    } else {
      const nextPlayer = findNearestOpponent(currentPlayer);
      if (nextPlayer) {
        nextPlayerId = nextPlayer.id;
      }
    }

    if (nextPlayerId !== null) {
      updatePlayersWithNewBall(nextPlayerId);
      playSound('pass.mp3');
      if (!gamePaused) {
        generateMathQuestion();
      }
    }

    setQuestionAnswered(false);
    setSelectingPlayer(false);
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/flat-soccer-football-stadium-illustration_23-2148909913.jpg')" }}>
      {showResumePopup && <ResumePopup onResume={handleResumeGame} />}
      {navigateToLandingPage ? (
        <LandingPage onStartGame={handleStartGame} />
      ) : gameOver ? (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex items-center justify-center">
          {/* Game Over screen */}
        </div>
      ) : gameStarted ? (
        inTossPhase ? (
          <>
            <TossCoin onTossResult={handleTossResult} onStartGame={() => setInTossPhase(false)} />
            {tossResult && (
              <div className="text-center text-white text-xl mt-4">
                {tossResult}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col h-screen">
            <div className="flex justify-center items-center bg-gray-800 bg-opacity-70 p-4">
              <div className="text-xl font-bold text-white">
                <div className="text-green-400">Team A: {score.A}</div>
                <div className="text-red-400">Team B: {score.B}</div>
              </div>
            </div>
            <div className="relative flex-grow bg-green-600 border-4 border-white">
              {/* Field and Players */}
              {showQuestion && <MathQuestion question={currentQuestion} onAnswer={handleAnswer} />} {/* Show or hide question */}
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default App;
