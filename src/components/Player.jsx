import { useState } from "react";
export default function Player({
  intialName,
  symbol,
  isActive,
  onChangePlayerName,
}) {
  const [playerName, setPlayerName] = useState(intialName);
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = function () {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangePlayerName(symbol, playerName);
    }
  };
  const handlechange = function (ev) {
    setPlayerName(ev.target.value);
  };
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing && <span className="player-name">{playerName}</span>}
        {isEditing && (
          <input
            type="text"
            required
            value={playerName}
            onChange={handlechange}
          ></input>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
