import React from 'react';

const MathQuestion = ({ question, answer, setAnswer, handleAnswer, timer }) => {
  return (
    <div className="mt-6 p-4 bg-white rounded shadow-md max-w-sm mx-auto">
      <p className="text-lg font-semibold text-center mb-2">Solve: {question}</p>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        onClick={handleAnswer}
        className={`w-full text-white py-2 rounded ${answer ? 'bg-red-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
        disabled={!answer}
      >
        Submit
      </button>
      <div className="text-right text-gray-500 mt-2">Time left: {timer} seconds</div>
    </div>
  );
};

export default MathQuestion;
