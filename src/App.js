import React, { useState, useEffect } from 'react';
import Player from './component/Player';
import MathQuestion from './component/MathsQuestion';
import { playSound } from './soundUtils';
import { stopAllSounds } from './stopAllSounds';
import LandingPage from './component/Landingpage';
import TossCoin from './component/TossCoin';

const initialPlayers = [
  // Team A Players
  { id: 0, team: 'A', name: 'Player A1', hasBall: false, left: '5%', top: '50%' },
  { id: 1, team: 'A', name: 'Player A2', hasBall: false, left: '20%', top: '20%' },
  { id: 2, team: 'A', name: 'Player A3', hasBall: false, left: '20%', top: '80%' },
  { id: 3, team: 'A', name: 'Player A4', hasBall: false, left: '40%', top: '30%' },
  { id: 4, team: 'A', name: 'Player A5', hasBall: false, left: '40%', top: '70%' },
  { id: 5, team: 'A', name: 'Player A6', hasBall: false, left: '70%', top: '50%' },
  // Team B Players
  { id: 6, team: 'B', name: 'Player B1', hasBall: false, left: '95%', top: '50%' },
  { id: 7, team: 'B', name: 'Player B2', hasBall: false, left: '80%', top: '20%' },
  { id: 8, team: 'B', name: 'Player B3', hasBall: false, left: '80%', top: '80%' },
  { id: 9, team: 'B', name: 'Player B4', hasBall: false, left: '60%', top: '30%' },
  { id: 10, team: 'B', name: 'Player B5', hasBall: false, left: '60%', top: '70%' },
  { id: 11, team: 'B', name: 'Player B6', hasBall: false, left: '30%', top: '50%' },
];
const generateEasyQuestion = () => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const question = `${num1} + ${num2}`;
  const answer = num1 + num2;
  return { question, answer };
};
const generateMediumQuestion = () => {
  const operators = ['+', '-', '*', '/'];
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let question = `${num1} ${operator} ${num2}`;
  let answer;

   
  switch (operator) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break;
    case '/':
      answer = num2 !== 0 ? num1 / num2 : 0;
      break;
    default:
      answer = 0;
  }

  return { question, answer };
};

const generateHardQuestion = () => {
  const num1 = Math.floor(Math.random() * 20);
  const num2 = Math.floor(Math.random() * 20);
  const num3 = Math.floor(Math.random() * 10);
  const question = `(${num1} + ${num2}) * ${num3}`;
  const answer = (num1 + num2) * num3;
  return { question, answer };
};
  

const App = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState({ A: 0, B: 0 });
  const [timer, setTimer] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [selectingPlayer, setSelectingPlayer] = useState(false);
  const [selectingTeammate, setSelectingTeammate] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [inTossPhase, setInTossPhase] = useState(false);
  const [tossResult, setTossResult] = useState(null);
  const [gameDuration, setGameDuration] = useState(300); 
  const [gameOver, setGameOver] = useState(false);
  const [navigateToLandingPage] = useState(false);
  const [showResumePopup, setShowResumePopup] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [gameLevel, setGameLevel] = useState('easy');


  
  useEffect(() => {
    if (gameStarted && !inTossPhase) {
      playSound('whistle.mp3');
      startGame();
  
      const durationInterval = setInterval(() => {
        setGameDuration(prevDuration => {
          if (prevDuration <= 1) {
            clearInterval(durationInterval);
            endGame();  
            return 0;
          }
          return prevDuration - 1;
        });
      }, 1000);
  
      return () => clearInterval(durationInterval);
    }
  }, [gameStarted, inTossPhase]);
  
  useEffect(() => {
    if (gameOver) {
       
    }
  }, [gameOver]);
  useEffect(() => {
    if (timerRunning && timer > 0 && !questionAnswered) {
      const timerId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timer <= 0 && timerRunning) {
      handleTimeout();
    }
    return () => clearInterval(window.timerId);
  }, [timer, timerRunning, questionAnswered]);
  

  const startGame = () => {
    setShowQuestion(true);
    const playerWithBall = players.find(p => p.hasBall);
    if (playerWithBall) {
      setCurrentPlayer(playerWithBall);
      generateMathQuestion();
    }
  };
  const handleResumeGame = () => {
    playSound('whistle.mp3');
     setShowResumePopup(false);  
  setGamePaused(false);       
  setTimerRunning(true);      
  generateMathQuestion();  
  setShowQuestion(true);   
};
  
  
  

  const handleTossResult = (team) => {
    setTossResult(`Team ${team} won the toss`);
    if (team === 'A') {
      updatePlayersWithNewBall(3); // A1 starts with the ball
    } else {
      updatePlayersWithNewBall(9); // B1 starts with the ball
    }
    setCurrentPlayer(players.find(p => p.hasBall));
  };

  const handleStartGame = (level) => {
    setGameLevel(level); // Set the selected game level
    setGameStarted(true);
    setInTossPhase(true);
  };

  const generateMathQuestion = () => {
    if (gameOver) return;  // Don't generate new questions if the game is over
    
    let questionData;
    
    switch (gameLevel) {
      case 'easy':
        questionData = generateEasyQuestion();
        break;
      case 'medium':
        questionData = generateMediumQuestion();
        break;
      case 'hard':
        questionData = generateHardQuestion();
        break;
      default:
        questionData = generateEasyQuestion();
    }
    
    setCurrentQuestion(questionData);
    setAnswer('');
    setTimer(15);
    setTimerRunning(true);
    setQuestionAnswered(false);
  };

  const handleAnswer = () => {
    if (questionAnswered) return;
  
    if (parseInt(answer) === currentQuestion.answer) {
      setQuestionAnswered(true);
      setTimerRunning(false);
  
      if (currentPlayer.id === 5) {
        const goalkeeper = players.find(p => p.id === 6);
        if (goalkeeper) {
          updatePlayersWithNewBall(goalkeeper.id);
          setCurrentPlayer(goalkeeper);
          playSound('pass.mp3');
          generateMathQuestion();
          showAlert('Goalkeeper for Team B has to make a save! or Team A will have a Goal', 'bg-red-600', 'text-white', 'top-0');
  
        }
      } else if (currentPlayer.id === 6) {
        playSound('save.mp3');
        setSelectingPlayer(true);
      } else if (currentPlayer.id === 11) {
        const goalkeeper = players.find(p => p.id === 0);
        if (goalkeeper) {
          updatePlayersWithNewBall(goalkeeper.id);
          setCurrentPlayer(goalkeeper);
          playSound('pass.mp3');
          generateMathQuestion();
          showAlert('Goalkeeper for Team A has to make a save! or Team B will have a Goal', 'bg-green-600', 'text-white','top-0' );
  
        }
      } else if (currentPlayer.id === 0) {
        playSound('save.mp3');
        setSelectingPlayer(true);
      } else {
        setSelectingPlayer(true);
      }
    } else {
      handleTimeout();
    }
  };
  const showAlert = (message, bgColor, textColor, position = 'top-16') => {
    const alertElement = document.createElement('div');
    alertElement.className = `fixed ${position} left-1/2 transform -translate-x-1/2 ${bgColor} ${textColor} p-4 text-center font-bold z-50`;
    alertElement.textContent = message;
    document.body.appendChild(alertElement);
    setTimeout(() => alertElement.remove(), 3000); // Remove after 3 seconds
};


  const handleTimeout = () => {
    if (gameOver || gamePaused) return;  // Prevent action when the game is paused
  
    let nextPlayerId = null;
  
    if (currentPlayer.id === 0) {
      nextPlayerId = 3; // Team A loses the ball
      playSound('goal.mp3');
      setScore(prevScore => ({ ...prevScore, B: prevScore.B + 1 }));
      showAlert('Team B has a goal!', 'bg-red-600', 'text-white');  // It should now show red

  
      setTimerRunning(false); // Stop the timer
      setShowResumePopup(true); // Show resume button after goal
      setGamePaused(true);      // Pause the game
      setShowQuestion(false);  
    } else if (currentPlayer.id === 6) {
      nextPlayerId = 9; // Team B loses the ball
      playSound('goal.mp3');
      setScore(prevScore => ({ ...prevScore, A: prevScore.A + 1 }));
      showAlert('Team A has a goal!', 'bg-green-600', 'text-white');
      setTimerRunning(false); // Stop the timer
      setShowResumePopup(true); // Show resume button after goal
      setGamePaused(true);      // Pause the game
      setShowQuestion(false);  
    } else {
      const nextPlayer = findNearestOpponent(currentPlayer); // Find the nearest opponent
      if (nextPlayer) {
        nextPlayerId = nextPlayer.id;
      }
    }
  
    if (nextPlayerId !== null) {
      updatePlayersWithNewBall(nextPlayerId); // Change possession
      playSound('pass.mp3');
      if (!gamePaused) {
        generateMathQuestion(); // Generate a new question if the game isn't paused
      }
    }
  
    setQuestionAnswered(false);
    setSelectingPlayer(false);
  };
  
  
  const endGame = () => {
    setGameOver(true);
    playSound('finalwhistle.mp3');
    stopAllSounds(); 
  };

  const updatePlayersWithNewBall = (newBallHolderId) => {
    const newPlayers = players.map(player =>
      player.id === newBallHolderId ? { ...player, hasBall: true } : { ...player, hasBall: false }
    );
    setPlayers(newPlayers);
    setCurrentPlayer(newPlayers.find(p => p.id === newBallHolderId));
  };

  const findNearestPlayer = (player, filterFn) => {
    const playersList = players.filter(filterFn);
    if (playersList.length === 0) return null;

    const getDistance = (p1, p2) => {
      const dx = parseFloat(p1.left) - parseFloat(p2.left);
      const dy = parseFloat(p1.top) - parseFloat(p2.top);
      return Math.sqrt(dx * dx + dy * dy);
    };

    return playersList.reduce((nearest, candidate) => {
      const distance = getDistance(player, candidate);
      return distance < (nearest ? getDistance(player, nearest) : Infinity) ? candidate : nearest;
    }, null);
  };

  const findNearestOpponent = player => {
    return findNearestPlayer(player, p => p.team !== player.team && !p.hasBall);
  };

  const handlePlayerClick = (playerId) => {
    if (gamePaused) return;  // Prevent player interaction when the game is paused
  
    if (selectingPlayer) {
      const selectedPlayer = players.find(p => p.id === playerId);
      if (selectedPlayer && selectedPlayer.team === currentPlayer.team && !selectedPlayer.hasBall) {
        updatePlayersWithNewBall(playerId); // Change possession
        setSelectingPlayer(false);
        playSound('pass.mp3');
        generateMathQuestion(); // Generate a new question on a pass if the game isn't paused
      }
    } else if (selectingTeammate) {
      handleTeammateSelection(playerId);
    }
  };
  const handleLevelSelection = (level) => {
    setGameLevel(level); // Set the selected game level
  };
  const handleTeammateSelection = (playerId) => {
    const selectedTeammate = players.find(p => p.id === playerId);
    if (selectedTeammate && selectedTeammate.team === currentPlayer.team && !selectedTeammate.hasBall) {
      updatePlayersWithNewBall(selectedTeammate.id);
      setSelectingTeammate(false);
      playSound('pass.mp3');
      generateMathQuestion();
    }
  };

  const resetGame = () => {
    setPlayers(initialPlayers.map(p => ({ ...p, hasBall: false }))); // Reset player state
    setCurrentQuestion(null);
    setCurrentPlayer(null);
    setAnswer('');
    setScore({ A: 0, B: 0 });
    setTimer(10);
    setTimerRunning(false);
    setQuestionAnswered(false);
    setSelectingPlayer(false);
    setSelectingTeammate(false);
    setGameStarted(false);
    setInTossPhase(false);
    setTossResult(null);
    setGameDuration(300);
    setGameOver(false);
  };
  const ResumePopup = ({ onResume }) => (
    
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Goal Scored!</h2>
        <button
          onClick={onResume}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Resume Game
        </button>
      </div>
    </div>
  );
  
  
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/flat-soccer-football-stadium-illustration_23-2148909913.jpg')" }}>
       {showResumePopup && <ResumePopup onResume={handleResumeGame} />}
      {navigateToLandingPage ? (
        <LandingPage onStartGame={handleStartGame} />
      ) : gameOver ? (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Game Over</h1>
          <div className="text-xl mb-4">
            {score.A > score.B ? <p>Team A Wins!</p> : score.B > score.A ? <p>Team B Wins!</p> : <p>It's a Draw!</p>}
          </div>
          <button
            onClick={() => resetGame()}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Play Again
          </button>
        </div>
      </div>
      
      ) : gameStarted ? (
        inTossPhase ? (
          <>
            <TossCoin onTossResult={handleTossResult} onLevelSelection={handleLevelSelection}   difficultyLevel={gameLevel} onStartGame={() => setInTossPhase(false)} />
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
                <div className="text-white">Time Left: {Math.floor(gameDuration / 60)}:{gameDuration % 60 < 10 ? `0${gameDuration % 60}` : gameDuration % 60}</div>
              </div>
            </div>
            <div className="relative flex-grow bg-green-600 border-4 border-white">
              {/* Field Borders */}
              <div className="absolute top-0 left-0 h-full w-12 bg-green-800 border-r-4 border-white"></div>
              <div className="absolute top-0 right-0 h-full w-12 bg-green-800 border-l-4 border-white"></div>
              <div className="absolute top-0 left-12 right-12 h-full border-l-4 border-r-4 border-white">
                <div className="h-full w-1 bg-white absolute left-1/2 transform -translate-x-1/2"></div>
              </div>

              {/* Goal Areas */}
              <div className="absolute top-1/2 left-0 w-16 h-24 bg-green-700 border-4 border-white" style={{ transform: 'translateY(-50%)' }}></div>
              <div className="absolute top-1/2 right-0 w-16 h-24 bg-green-700 border-4 border-white" style={{ transform: 'translateY(-50%)' }}></div>

              {/* Penalty Areas */}
              <div className="absolute top-1/2 left-12 w-32 h-32 bg-green-800 border-4 border-white" style={{ transform: 'translateY(-50%)' }}></div>
              <div className="absolute top-1/2 right-12 w-32 h-32 bg-green-800 border-4 border-white" style={{ transform: 'translateY(-50%)' }}></div>

              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-transparent border-4 border-white rounded-full" style={{ transform: 'translate(-50%, -50%)' }}></div>

              {/* Center Line */}
              <div className="absolute top-0 left-1/2 h-full w-1 bg-white transform -translate-x-1/2"></div>

              {/* Corner Areas */}
              <div className="absolute top-0 left-0 w-8 h-8 bg-transparent border-t-4 border-l-4 border-white"></div>
              <div className="absolute top-0 right-0 w-8 h-8 bg-transparent border-t-4 border-r-4 border-white"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-transparent border-b-4 border-l-4 border-white"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-transparent border-b-4 border-r-4 border-white"></div>

              {players.map(player => (
                <Player
                key={player.id}
                player={player}
                onClick={() => handlePlayerClick(player.id)}
                isSelectable={selectingPlayer && player.team === currentPlayer.team && !player.hasBall}
                isTeammateSelectable={selectingTeammate && player.team === currentPlayer.team && !player.hasBall}
                hasBall={player.hasBall}
              />
              
              ))}
            </div>
            {showQuestion && currentQuestion && (
              <div className="bg-gray-800 bg-opacity-80 p-4">
             <MathQuestion
                  question={currentQuestion.question}
                  answer={answer}
                  setAnswer={setAnswer}
                  handleAnswer={handleAnswer}
                  timer={timer}
                />
              </div>
            )}
          </div>
        )
      ) : (
        <LandingPage onStartGame={handleStartGame} />
      )}
    </div>
  );
};

export default App;