export default function Log({ turns }) {
  return (
    <div id="log-container">
      <ol id="log">
        {turns.map((turn) => (
          <li key={`${turn.square.row}${turn.square.col}`}>
            {turn.player} selected in ({turn.square.row},{turn.square.col})
          </li>
        ))}
      </ol>
    </div>
  );
}
