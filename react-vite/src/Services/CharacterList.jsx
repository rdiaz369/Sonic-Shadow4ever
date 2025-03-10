import { useEffect, useState } from 'react';
import Parse from 'parse';

const CharacterList = ({ refreshTrigger }) => {
  const [characters, setCharacters] = useState([]); //Use usestaet for our function

  // Use Useeffect to parse out back4app
  useEffect(() => {
    const fetchCharacters = async () => {
      const Character = Parse.Object.extend('Characters');
      const query = new Parse.Query(Character);

      //Parse our Characters Class
      try {
        const results = await query.find();
        const characterData = await Promise.all(
          results.map(async (char) => {
            const powerQuery = new Parse.Query('Powers');
            // Parse our Powers class with pointer
            powerQuery.equalTo('character', char);
            const powers = await powerQuery.find();

            //Get out Data from POewrs Class
            return {
              id: char.id,
              name: char.get('name'),
              powers: powers.map((p) => ({
                name: p.get('name'),
                age: p.get('age'),
                gender: p.get('gender'),
              })),
            };
          })
        );
        
        // Use State
        setCharacters(characterData);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [refreshTrigger]); // Re-fetch the characters whenever refreshTrigger changes

  //This is what we want to render 
  return (
    <div>
      {characters.length === 0 ? <p>No characters found.</p> : (
        <ul>
          {characters.map((char) => (
            <li key={char.id}>
              <strong>{char.name}</strong>
              <ul>
                {char.powers.length > 0 ? (
                  char.powers.map((power, index) => (
                    <li key={index}>
                      (Power: {power.name}, Age: {power.age}, Gender: {power.gender})
                    </li>
                  ))
                ) : (
                  <li>No powers assigned.</li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CharacterList;