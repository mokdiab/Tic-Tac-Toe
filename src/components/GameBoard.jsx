export default function GameBoard({ onSelectedSquare, turns }) {
  return (
    <ol id="game-board">
      {turns.map((row, rowInd) => (
        <li key={rowInd}>
          <ol>
            {row.map((col, colInd) => (
              <li key={colInd}>
                <button
                  onClick={() => onSelectedSquare(rowInd, colInd)}
                  disabled={turns[rowInd][colInd] !== null}
                >
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
      <p className="footer-text">Mohamed Diab</p>
    </ol>
  );
}
