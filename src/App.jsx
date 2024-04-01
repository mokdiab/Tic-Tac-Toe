import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const getActivePlayer = function (prevTurns) {
  let currPlayer = "X";
  if (prevTurns.length > 0 && prevTurns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
};
const deriveGameBoard = function (gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};
const deriveWinner = function (gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }
  return winner;
};
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  const activePlayer = getActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const isDraw = gameTurns.length === 9 && !winner;
  const handlePlayerNames = function (symbol, newName) {
    setPlayers((prevNmaes) => {
      return { ...prevNmaes, [symbol]: newName };
    });
  };
  const handleSelectSquare = function (rowInd, colInd) {
    setGameTurns((prevTurns) => {
      const currPlayer = getActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowInd, col: colInd }, player: currPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };
  const handleRematch = function () {
    setGameTurns([]);
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            intialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangePlayerName={handlePlayerNames}
          />
          <Player
            intialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangePlayerName={handlePlayerNames}
          />
        </ol>
        Game Board
        {(winner || isDraw) && (
          <GameOver reMatch={handleRematch} winner={winner} />
        )}
        <GameBoard onSelectedSquare={handleSelectSquare} turns={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
export default App;
