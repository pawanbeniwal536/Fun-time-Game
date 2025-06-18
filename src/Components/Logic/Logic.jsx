import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const choices = ["rock", "paper", "scissor"];
const handEmojis = {
  rock: "✊",
  paper: "✋",
  scissor: "✌️",
};

const getResult = (player, computer) => {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissor") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissor" && computer === "paper")
  ) {
    return "win";
  }
  return "loss";
};

const Logic = () => {
  const [playerChoice, setPlayerChoice] = useState(() => sessionStorage.getItem("player") || "rock");
  const [computerChoice, setComputerChoice] = useState(() => sessionStorage.getItem("computer") || "scissor");
  const [result, setResult] = useState(() => sessionStorage.getItem("resultText") || "Start Playing!");
  const [wins, setWins] = useState(() => Number(sessionStorage.getItem("wins")) || 0);
  const [losses, setLosses] = useState(() => Number(sessionStorage.getItem("losses")) || 0);
  const [draws, setDraws] = useState(() => Number(sessionStorage.getItem("draws")) || 0);
  const [showHands, setShowHands] = useState(true);

  const handlePlayerChoice = (choice) => {
    const computerRandom = choices[Math.floor(Math.random() * 3)];
    const outcome = getResult(choice, computerRandom);

    setShowHands(false);
    setTimeout(() => {
      setPlayerChoice(choice);
      setComputerChoice(computerRandom);

      if (outcome === "win") {
        setWins((prev) => {
          const updated = prev + 1;
          sessionStorage.setItem("wins", updated);
          return updated;
        });
        setResult("You Win!");
      } else if (outcome === "loss") {
        setLosses((prev) => {
          const updated = prev + 1;
          sessionStorage.setItem("losses", updated);
          return updated;
        });
        setResult("Computer Wins!");
      } else {
        setDraws((prev) => {
          const updated = prev + 1;
          sessionStorage.setItem("draws", updated);
          return updated;
        });
        setResult("It's a Draw!");
      }

      sessionStorage.setItem("player", choice);
      sessionStorage.setItem("computer", computerRandom);
      sessionStorage.setItem("resultText", result);
      setShowHands(true);
    }, 500);
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 p-4">
      {/* Floating Animated Background Icons */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10 select-none"
            animate={{
              y: [0, -100, 100, 0],
              rotate: [0, 360, 0],
            }}
            transition={{ duration: 15 + Math.random() * 10, repeat: Infinity }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            {handEmojis[choices[Math.floor(Math.random() * 3)]]}
          </motion.div>
        ))}
      </div>

      {/* Game Card */}
      <div className="relative z-10 bg-white bg-opacity-80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl max-w-4xl w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-purple-800 drop-shadow-lg tracking-wide">
          🪨📄✂️ Rock Paper Scissors Game
        </h1>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {choices.map((choice) => (
            <motion.button
              key={choice}
              onClick={() => handlePlayerChoice(choice)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-xl font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              {choice.toUpperCase()}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center justify-between w-full max-w-2xl mx-auto mt-6 px-4 sm:px-0">
          <div className="text-center">
            <AnimatePresence>
              {showHands && (
                <motion.div
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -200, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-7xl"
                >
                  {handEmojis[playerChoice]}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="text-xl mt-2 text-blue-800 font-semibold">You</div>
          </div>

          <div className="text-3xl sm:text-4xl font-bold text-green-700 text-center">
            {result}
          </div>

          <div className="text-center">
            <AnimatePresence>
              {showHands && (
                <motion.div
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 200, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-7xl"
                >
                  {handEmojis[computerChoice]}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="text-xl mt-2 text-red-800 font-semibold">Computer</div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-white to-purple-100 p-6 rounded-xl shadow-inner text-center">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">🎯 Game Stats</h2>
          <div className="grid grid-cols-3 gap-6 text-lg">
            <p>
              🏆 Wins:<br /> <span className="text-green-600 font-bold text-2xl">{wins}</span>
            </p>
            <p>
              😢 Losses:<br /> <span className="text-red-600 font-bold text-2xl">{losses}</span>
            </p>
            <p>
              🤝 Draws:<br /> <span className="text-yellow-600 font-bold text-2xl">{draws}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logic;