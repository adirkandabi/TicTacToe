import { useState } from "react";

export default function Player({ intialName, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [PlayerName, setPlayerName] = useState(intialName);
  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }
  function handleChange(event) {
    setPlayerName(event.target.value);
    if (isEditing) {
      onChangeName(symbol, event.target.value);
    }
  }

  let editablePlayerName = <span className="player-name">{PlayerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={PlayerName}
        onChange={handleChange}
      ></input>
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>
        {isEditing === false ? "Edit" : "Save"}
      </button>
    </li>
  );
}
