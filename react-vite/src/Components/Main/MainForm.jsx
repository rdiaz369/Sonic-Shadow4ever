import React, { useState } from "react";
import { createCharacterWithPowers } from "../../database/queries/CharacterQueries";  // Update import name

const MainForm = () => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [powers, setPowers] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCharacterWithPowers(name, species, age, gender, powers);  // Update function call
    alert("Character created successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Species" value={species} onChange={(e) => setSpecies(e.target.value)} required />
      <input type="text" placeholder="Powers" value={powers} onChange={(e) => setPowers(e.target.value)} required />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
      <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} required />
      <button type="submit">Create Character</button>
    </form>
  );
};

export default MainForm;
