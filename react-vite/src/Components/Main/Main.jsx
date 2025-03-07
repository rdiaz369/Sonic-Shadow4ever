import React, { useState, useEffect } from 'react';
import { getAllCharacters } from '../../Services/Characters'; // Import the function to get characters
import MainList from './MainList.jsx'; // Assuming you have a component to display the list

// Parent component that renders a list of characters
function Main() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getAllCharacters()
      .then((characters) => {
        console.log('Fetched characters:', characters);  // Log the characters data
        setCharacters(characters);
      })
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);
  
  const handleAddCharacter = (newCharacter) => {
    setCharacters((prevCharacters) => [...prevCharacters, newCharacter]); // Add the new character to the list
  };

  return (
    <div>
      <h1>Welcome to Green Hills</h1>
      {/* You can add a form or another component here to add new characters */}
      <h2>Character List</h2>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            {character.name} - {character.gender} - {character.species} - Age: {character.age} 
            - Powers: {character.powers}
          </li>
        ))}
      </ul>
      {/* Assuming you have MainList to display the characters */}
      <MainList characters={characters} />
    </div>
  );
}

export default Main;
