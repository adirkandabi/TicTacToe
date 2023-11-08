import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combintations.js";
import Player from "./components/Player";
import Log from "./components/Log.jsx";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function deriveWinner(gameBoard, players) {
  let winner;

  for (const combintations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combintations[0].row][combintations[0].col];
    const secondtSquareSymbol =
      gameBoard[combintations[1].row][combintations[1].col];
    const thirdSquareSymbol =
      gameBoard[combintations[2].row][combintations[2].col];
    if (
      firstSquareSymbol === secondtSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol &&
      firstSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function deriveGameBoard(gameTurns) {
  const gameBoard = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayer] = useState({
    X: "player 1",
    O: "Player 2",
  });
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const draw = !winner && gameTurns.length === 9;

  function handlerSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function gameReset() {
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayer((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            intialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            intialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || draw) && <GameOver winner={winner} onSelect={gameReset} />}
        <GameBoard onSelectSquare={handlerSelectSquare} board={gameBoard} />
      </div>
      {gameTurns.length > 0 ? <Log turns={gameTurns} /> : null}
    </main>
  );
}

export default App;
