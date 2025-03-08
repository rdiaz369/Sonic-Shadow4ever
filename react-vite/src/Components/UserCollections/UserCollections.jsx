import React, { useEffect, useState } from "react";
import { getAllCharacters } from "../../database/queries/CharacterQueries";
import CharacterList from "../CharacterList/CharacterList";

const UserCollections = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const allCharacters = await getAllCharacters(); // Fetch characters asynchronously
        setCharacters(allCharacters); // Update the state with the characters
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="user-collections">
      <h2>User's Character Collection</h2>
      {characters.length > 0 ? (
        <CharacterList characters={characters} />
      ) : (
        <p>No characters found.</p>
      )}
    </div>
  );
};

export default UserCollections;
