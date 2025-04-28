import { useEffect, useState } from 'react';
import Parse from 'parse';
import { algoliasearch } from 'algoliasearch';

const CharacterList = ({ refreshTrigger }) => {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredCharacters, setFilteredCharacters] = useState([]); // State for search results

  // Initialize Algolia client here directly in CharacterList
  const client = algoliasearch('209QOGKTD3', '5436dd506a1e45a34278af0ed8558a47');
  const indexName = 'characters'; // The name of your Algolia index

  useEffect(() => {
    const fetchCharacters = async () => {
      const Character = Parse.Object.extend('Characters');
      const query = new Parse.Query(Character);

      try {
        const results = await query.find();
        const characterData = await Promise.all(
          results.map(async (char) => {
            const powerQuery = new Parse.Query('Powers');
            powerQuery.equalTo('character', char);
            const powers = await powerQuery.find();

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

        setCharacters(characterData);
        setFilteredCharacters(characterData); // Set filtered characters to all initially

        // After fetching characters, push the data to Algolia
        syncDataToAlgolia(characterData);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [refreshTrigger]); // Re-fetch characters whenever refreshTrigger changes

  const syncDataToAlgolia = async (characterData) => {
    try {
      // Ensure the client is initialized
      if (!client) {
        console.error('Algolia client is not initialized.');
        return;
      }

      // Log the character data to check its structure
      console.log('Character Data to sync:', characterData);

      // Transform the character data into the format required by Algolia
      const objectsToIndex = characterData.map((char) => {
        if (!char.id || !char.name || !char.powers) {
          console.error('Invalid character data', char);
          return null; // Avoid adding invalid characters
        }
        return {
          objectID: char.id, // Algolia requires a unique objectID
          name: char.name,
          powers: char.powers.map((p) => ({
            name: p.name,
            age: p.age,
            gender: p.gender,
          })),
        };
      }).filter((obj) => obj !== null); // Remove any invalid objects

      // Log the final objects to index
      console.log('Objects to be indexed:', objectsToIndex);

      // Check if objectsToIndex is empty or undefined
      if (!objectsToIndex || objectsToIndex.length === 0) {
        console.error('No valid data to index in Algolia.');
        return;
      }

      // Ensure index name is correct
      if (!indexName) {
        console.error('Index name is not provided or is invalid.');
        return;
      }

      // Log the index name
      console.log('Using index name:', indexName);

      // Push the data to Algolia
      const response = await client.saveObjects({
        indexName: indexName, // Pass indexName here
        objects: objectsToIndex, // Pass the objects array here
      });

      // Log the response from Algolia
      console.log('Algolia saveObjects response:', response);

      console.log('Data synced to Algolia');
    } catch (error) {
      console.error('Error syncing data to Algolia:', error);
    }
  };

  const searchAlgolia = async (query) => {
    try {
      // Directly use searchSingleIndex without calling initIndex
      const searchResults = await client.searchSingleIndex({
        indexName, // Specify the index name
        searchParams: { query }, // Pass the query parameters
      });

      console.log('Search results from Algolia:', searchResults);
      // Set the filtered characters from search results
      setFilteredCharacters(searchResults.hits);
    } catch (error) {
      console.error('Error searching Algolia:', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update the search query state

    if (query) {
      searchAlgolia(query); // Trigger search if query is not empty
    } else {
      setFilteredCharacters(characters); // Show all characters if search query is cleared
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Characters"
        value={searchQuery}
        onChange={handleSearchChange} // Update search query on input change
      />

      {/* Display the filtered characters */}
      {filteredCharacters.length === 0 ? (
        <p>No characters found.</p>
      ) : (
        <ul>
          {filteredCharacters.map((char) => (
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
