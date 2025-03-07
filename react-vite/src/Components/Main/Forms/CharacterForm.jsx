import { useState } from "react";
import "../CSS/characters.css";

const CharacterForm = () => {
  const [character, setCharacter] = useState({
    name: "",
    type: "",
    ability: "",
  });

  const handleChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Character Created:", character);
    alert(`Character ${character.name} has been created!`);
    setCharacter({ name: "", type: "", ability: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Your Own Sonic Character</h1>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={character.name}
          onChange={handleChange}
          placeholder="Enter character name"
          required
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          name="type"
          value={character.type}
          onChange={handleChange}
          placeholder="Enter character type (e.g., Hedgehog)"
          required
        />
      </label>
      <label>
        Special Ability:
        <input
          type="text"
          name="ability"
          value={character.ability}
          onChange={handleChange}
          placeholder="Enter special ability"
          required
        />
      </label>
      <button type="submit">Create Character</button>
    </form>
  );
};

export default CharacterForm;