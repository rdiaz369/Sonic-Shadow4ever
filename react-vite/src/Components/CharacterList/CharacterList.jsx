import React, { useEffect, useState } from "react";
import { getAllCharacters } from "../../database/queries/CharacterQueries";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const results = await getAllCharacters();
      console.log("Fetched characters:", results);

      // Now we need to extract and log the actual data
      const charactersData = results.map((char) => ({
        id: char.id,
        name: char.get("name"), // Get the name of the character
        species: char.get("Species"), // Get the species of the character
        powers: char.get("Powers") ? char.get("Powers").map((power) => power.get("name")).join(", ") : "No powers listed", // Get related powers
      }));

      console.log("Formatted characters data:", charactersData);

      setCharacters(charactersData); // Set the formatted characters data to state
    };

    fetchCharacters();
  }, []);

  return (
    <div>
      <h2>Character List</h2>
      <ul>
        {characters.map((char) => (
          <li key={char.id}>
            {char.name} - {char.species} - {char.powers}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
