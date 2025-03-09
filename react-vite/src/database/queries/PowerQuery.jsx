import { useEffect, useState } from 'react';
import Parse from 'parse';

const PowerForm = () => {
  const [characters, setCharacters] = useState([]);
  const [characterPowers, setCharacterPowers] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(false); // Trigger for refreshing the list

  // Fetch available characters and their powers
  useEffect(() => {
    const fetchCharacters = async () => {
      const Character = Parse.Object.extend('Characters');
      const query = new Parse.Query(Character);

      try {
        const results = await query.find();
        setCharacters(results);

        // Fetch powers for each character
        const powersData = await Promise.all(
          results.map(async (char) => {
            const powerQuery = new Parse.Query('Powers');
            powerQuery.equalTo('character', char);
            const powers = await powerQuery.find();

            return {
              characterId: char.id,
              powers: powers.map((p) => ({
                name: p.get('name'),
                age: p.get('age'),
                gender: p.get('gender'),
              })),
            };
          })
        );

        // Map powers to corresponding characters
        const powersMap = powersData.reduce((acc, data) => {
          acc[data.characterId] = data.powers;
          return acc;
        }, {});
        setCharacterPowers(powersMap);
      } catch (error) {
        console.error('Error fetching characters and powers:', error);
      }
    };

    fetchCharacters();
  }, [refreshTrigger]); // Re-fetch the characters whenever refreshTrigger changes

  return (
    <div>
      <h3>Character Powers</h3>
      {characters.length === 0 ? (
        <p>No characters found.</p>
      ) : (
        <ul>
          {characters.map((char) => (
            <li key={char.id}>
              <strong>{char.get('name')}</strong>
              {characterPowers[char.id]?.length > 0 ? (
                <ul>
                  {characterPowers[char.id].map((power, index) => (
                    <li key={index}>
                      (Power: {power.name}, Age: {power.age}, Gender: {power.gender})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No powers assigned.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PowerForm;
