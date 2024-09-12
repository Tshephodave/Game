import React from 'react';

const baseSpriteStyles = {
  width: '64px',
  height: '96px',
  backgroundSize: '64px 96px',
  backgroundRepeat: 'no-repeat',
};

const Player = ({ player, onClick, isSelectable }) => {
  const isGoalkeeper = (player.team === 'A' && player.id === 0) || (player.team === 'B' && player.id === 6);

  const spriteImage = isGoalkeeper
    ? player.team === 'A'
      ? 'url(/sprite/keeper.png)'
      : 'url(/sprite/real.jpg)'
    : player.team === 'A'
      ? 'url(/sprite/TeamGree.jpg)'
      : 'url(/sprite/teamred.jpg)';

  const spriteStyles = {
    ...baseSpriteStyles,
    backgroundImage: spriteImage,
  };

  const playerClasses = `absolute flex flex-col items-center cursor-${isSelectable ? 'pointer' : 'default'} ${player.team === 'A' ? 'text-green-800' : 'text-red-800'}`;

  const positionStyles = {
    left: player.left,
    top: player.top,
    transform: 'translate(-50%, -50%)',
    ...spriteStyles,
  };

  return (
    <div className={playerClasses} style={positionStyles} onClick={isSelectable ? onClick : undefined}>
      <div
        className={`relative flex flex-col items-center ${
          player.team === 'A' ? 'bg-green-300' : 'bg-red-300'
        } ${player.hasBall ? 'border-4 border-yellow-600 animate-flash' : 'border-2 border-gray-500'} rounded-md p-1`}
      >
        {/* Sprite for player */}
        <div className="w-16 h-24" style={spriteStyles}></div>

        {/* Ball Icon */}
        {player.hasBall && (
          <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 text-2xl">
            ⚽
          </span>
        )}

       {/* Player Label with conditional positioning */}
<div
  className={`absolute text-base font-bold ${player.id === 6 ? 'left-[-50px]' : 'right-[-50px]'} top-1/2 transform -translate-y-1/2 bg-white px-1 rounded-md shadow-md`}
>
  {player.team} {player.id % 11 + 1}
</div>


      </div>
    </div>
  );
};

export default Player;
