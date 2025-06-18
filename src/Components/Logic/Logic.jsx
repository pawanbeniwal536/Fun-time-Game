import React, { useEffect, useState } from "react";

const choices = ["rock", "paper", "scissor"];

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
  // Initialize from sessionStorage or 0
  const [playerChoice, setPlayerChoice] = useState(sessionStorage.getItem("player") || "");
  const [computerChoice, setComputerChoice] = useState(sessionStorage.getItem("computer") || "");
  const [result, setResult] = useState(sessionStorage.getItem("resultText") || "");

  const [wins, setWins] = useState(() => Number(sessionStorage.getItem("wins")) || 0);
  const [losses, setLosses] = useState(() => Number(sessionStorage.getItem("losses")) || 0);
  const [draws, setDraws] = useState(() => Number(sessionStorage.getItem("draws")) || 0);

  const handlePlayerChoice = (choice) => {
    const computerRandom = choices[Math.floor(Math.random() * 3)];
    const outcome = getResult(choice, computerRandom);

    let resultText = "";

    if (outcome === "win") {
      setWins((prev) => {
        const updated = prev + 1;
        sessionStorage.setItem("wins", updated);
        return updated;
      });
      resultText = "You Win!";
    } else if (outcome === "loss") {
      setLosses((prev) => {
        const updated = prev + 1;
        sessionStorage.setItem("losses", updated);
        return updated;
      });
      resultText = "Computer Wins!";
    } else {
      setDraws((prev) => {
        const updated = prev + 1;
        sessionStorage.setItem("draws", updated);
        return updated;
      });
      resultText = "It's a Draw!";
    }

    setPlayerChoice(choice);
    setComputerChoice(computerRandom);
    setResult(resultText);

    sessionStorage.setItem("player", choice);
    sessionStorage.setItem("computer", computerRandom);
    sessionStorage.setItem("resultText", resultText);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-200 to-purple-300 p-4">
      <h1 className="text-5xl font-extrabold mb-6 text-purple-800">Rock Paper Scissor</h1>

      <div className="flex gap-6 mb-8">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handlePlayerChoice(choice)}
            className="bg-white text-purple-700 border-2 border-purple-600 hover:bg-purple-100 px-6 py-3 rounded-lg text-xl font-bold transition-all shadow-md"
          >
            {choice.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="text-xl font-semibold mb-2">
        🧍 You chose: <span className="text-blue-800">{playerChoice}</span>
      </div>
      <div className="text-xl font-semibold mb-2">
        🤖 Computer chose: <span className="text-red-800">{computerChoice}</span>
      </div>
      <div className="text-3xl font-bold text-green-700 mt-4">{result}</div>

      {/* Scoreboard */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">🎯 Game Stats</h2>
        <p className="text-lg">🏆 Wins: <span className="text-green-600 font-bold">{wins}</span></p>
        <p className="text-lg">😢 Losses: <span className="text-red-600 font-bold">{losses}</span></p>
        <p className="text-lg">🤝 Draws: <span className="text-yellow-600 font-bold">{draws}</span></p>
      </div>
    </div>
  );
};

export default Logic;
