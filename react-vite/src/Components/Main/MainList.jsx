import React, { useEffect, useState } from "react";
import { getAllCharacters } from "../../database/queries/CharacterQueries";
import Parse from "parse";

const MainList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      const results = await getAllCharacters();
      setCharacters(results);
    }
    fetchCharacters();
  }, []);

  return (
    <div>
      <h2>Character List</h2>
      <ul>
        {characters.map((char, index) => {
          const isParseObject = char instanceof Parse.Object;
          const name = isParseObject ? char.get("name") : char.name;
          const species = isParseObject ? char.get("Species") : char.Species;
          const powers = isParseObject ? char.get("Powers") || [] : char.powers || [];

          return (
            <li key={char.id || index}>
              {name} - {species} - 
              {powers.length > 0 ? (
                powers.map((power, idx) => (
                  <span key={power.id || idx}>{power.get ? power.get("name") : power.name}</span>
                ))
              ) : (
                <span>No powers listed</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MainList;
