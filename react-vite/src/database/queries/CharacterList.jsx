import { useEffect, useState } from 'react';
import Parse from 'parse';
import { algoliasearch } from 'algoliasearch';

// Import images
import sonicImage from '../../Components/images/Sonic.jpeg';
import sonicImage2 from '../../Components/images/sonic2.jpg';
import knucklesImage from '../../Components/images/knuckles.jpg';
import tailsImage from '../../Components/images/miles.jpeg';
import rougeImage from '../../Components/images/rouge.jpeg';
import shadowImage from '../../Components/images/shadow.jpg';
import defaultImage from '../../Components/images/default_image.jpg';

const CharacterList = ({ refreshTrigger }) => {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [favoritedCharacters, setFavoritedCharacters] = useState([]); // NEW: Favorited characters
  const [loading, setLoading] = useState(true); // NEW: Loading state

  // Initialize Algolia client
  const client = algoliasearch('209QOGKTD3', '5436dd506a1e45a34278af0ed8558a47');
  const indexName = 'characters';

  // Character Images
  const characterImages = {
    Sonic: sonicImage,
    Knuckles: knucklesImage,
    Tails: tailsImage,
    Shadow: shadowImage,
    Rouge: rougeImage,
    default: defaultImage, // For fallback
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
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
        setFilteredCharacters(characterData);
        syncDataToAlgolia(characterData);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching characters:', error);
        setLoading(false); // Ensure loading is stopped on error
      }
    };

    fetchCharacters();
  }, [refreshTrigger]);

  // NEW: Fetch favorited characters for current user
  useEffect(() => {
    const fetchFavorites = async () => {
      const currentUser = Parse.User.current();
      if (currentUser) {
        const favoritesRelation = currentUser.relation('favorites');
        const query = favoritesRelation.query();
        try {
          const favorites = await query.find();
          setFavoritedCharacters(favorites.map((fav) => fav.id));
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchFavorites();
  }, []);

  const syncDataToAlgolia = async (characterData) => {
    try {
      if (!client) {
        console.error('Algolia client not initialized.');
        return;
      }

      const objectsToIndex = characterData.map((char) => {
        if (!char.id || !char.name || !char.powers) return null;
        return {
          objectID: char.id,
          name: char.name,
          powers: char.powers.map((p) => ({
            name: p.name,
            age: p.age,
            gender: p.gender,
          })),
        };
      }).filter((obj) => obj !== null);

      if (!objectsToIndex.length) {
        console.error('No valid data to index.');
        return;
      }

      await client.saveObjects({
        indexName,
        objects: objectsToIndex,
      });

      console.log('Data synced to Algolia');
    } catch (error) {
      console.error('Error syncing data to Algolia:', error);
    }
  };

  const searchAlgolia = async (query) => {
    try {
      const searchResults = await client.searchSingleIndex({
        indexName,
        searchParams: { query },
      });

      setFilteredCharacters(searchResults.hits);
    } catch (error) {
      console.error('Error searching Algolia:', error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      searchAlgolia(query);
    } else {
      setFilteredCharacters(characters);
    }
  };

  // NEW: Handle favorite/unfavorite
  const handleFavorite = async (characterId) => {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      alert('You must be logged in to favorite a character!');
      return;
    }

    try {
      const Character = Parse.Object.extend('Characters');
      const query = new Parse.Query(Character);
      query.equalTo('objectId', characterId);
      const character = await query.first();

      if (character) {
        const favoritesRelation = currentUser.relation('favorites');

        if (favoritedCharacters.includes(characterId)) {
          favoritesRelation.remove(character);
          setFavoritedCharacters((prev) => prev.filter((id) => id !== characterId));
          console.log(`Removed ${character.get('name')} from favorites.`);
        } else {
          favoritesRelation.add(character);
          setFavoritedCharacters((prev) => [...prev, characterId]);
          console.log(`Added ${character.get('name')} to favorites.`);
        }

        await currentUser.save();
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <>
      {/* Search Bar */}
      <div className="container mt-4">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search Characters"
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="container mt-4" style={{ maxWidth: '1200px', width: '90%' }}>
        {loading ? (
          <div className="alert alert-info text-center">Loading characters...</div>
        ) : characters.length === 0 ? (
          <div className="alert alert-warning text-center">No characters found.</div>
        ) : filteredCharacters.length === 0 ? (
          <div className="alert alert-info text-center">No results found for "{searchQuery}".</div>
        ) : (
          <div className="row">
            {filteredCharacters.map((char) => (
              <div key={char.id} className="col-md-4 mb-4">
                <div className="card shadow-sm h-100" style={{ borderRadius: '15px', backgroundColor: '#f8f9fa' }}>
                  <img
                    src={characterImages[char.name.trim()] || characterImages.default}
                    alt={char.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center" style={{ color: '#333' }}>{char.name}</h5>
                    <ul className="list-unstyled">
                      {char.powers.length > 0 ? (
                        char.powers.map((power, index) => (
                          <li key={index} className="mb-1">
                            <small><em>{power.name}</em> (Age: {power.age}, Gender: {power.gender})</small>
                          </li>
                        ))
                      ) : (
                        <li><small>No powers assigned.</small></li>
                      )}
                    </ul>

                    <div className="mt-auto text-center">
                      <button
                        onClick={() => handleFavorite(char.id)}
                        className={`btn btn-sm ${favoritedCharacters.includes(char.id) ? 'btn-warning' : 'btn-outline-warning'} rounded-pill`}
                        style={{
                          width: '70%',
                          fontWeight: 'bold',
                          marginTop: '1rem',
                        }}
                      >
                        {favoritedCharacters.includes(char.id) ? '⭐ Favorited' : '☆ Add Favorite'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CharacterList;
