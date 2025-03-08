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
        {characters.map((char) => {
          // Check if char is an instance of Parse.Object
          const isParseObject = char instanceof Parse.Object;
          
          return (
            <li key={char.id}>
              {/* Use .get() if it's a Parse Object, otherwise use direct access */}
              {isParseObject ? char.get("name") : char.name} - 
              {isParseObject ? char.get("Species") : char.species} - 
              {/* Assuming Powers is now an array of related objects */}
              {isParseObject && char.get("Powers") && char.get("Powers").length > 0 ? (
                char.get("Powers").map((power, index) => (
                  <span key={index}>{power.get("name")}</span> // Assuming Powers objects have a "name" property
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
