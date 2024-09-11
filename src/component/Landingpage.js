import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

// Import your logo and background image here if you are using local files
import logo from './4572174117896192.png'; // Adjust the path accordingly

const LandingPage = ({ onStartGame }) => {
  // Framer Motion animation settings
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // React Spring animation settings
  const [springProps] = useSpring(() => ({
    opacity: 1,
    transform: 'translateY(0px)',
    config: { tension: 200, friction: 12 },
  }));

  return (
    <div
      className="min-h-screen object-fit bg-no-repeat bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url('https://img.freepik.com/free-photo/kids-playing-soccer-cartoon_23-2151451224.jpg')` }}
    >
      {/* Header with logo */}
      <header className="bg-white bg-opacity-30 py-4 shadow-md">
        <div className="container mx-auto flex justify-center">
          <img src={logo} alt="Logo" className="h-12" />
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center text-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg text-center max-w-md"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold mb-4 text-black"
          >
            Welcome to the Math Soccer Game!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg mb-6 text-black font-bold"
          >
            Solve math questions to pass the ball and score goals.
          </motion.p>
          <animated.button
            onClick={onStartGame}
            style={springProps}
            className="bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-800 transition duration-300"
          >
            Start Game
          </animated.button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;




