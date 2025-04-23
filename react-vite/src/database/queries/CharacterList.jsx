import { useEffect, useState } from 'react';
import Parse from 'parse';
import sonicImage from '../../Components/images/Sonic.jpeg';  
import sonicImage2 from '../../Components/images/sonic2.jpg';  
import knucklesImage from '../../Components/images/knuckles.jpg';
import tailsImage from '../../Components/images/miles.jpeg';
import rougeImage from '../../Components/images/rouge.jpeg';
import shadowImage from '../../Components/images/shadow.jpg';
import defaultImage from '../../Components/images/default_image.jpeg';


const CharacterList = ({ refreshTrigger }) => {
  const [characters, setCharacters] = useState([]);
  const [favoritedCharacters, setFavoritedCharacters] = useState([]); // To track favorited characters

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
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [refreshTrigger]); // Re-fetch the characters whenever refreshTrigger changes

  // Fetch favorited characters for the current user
  useEffect(() => {
    const fetchFavorites = async () => {
      const currentUser = Parse.User.current();
      if (currentUser) { //logged in
        const favoritesRelation = currentUser.relation('favorites');
        const query = favoritesRelation.query();
        try {
          const favorites = await query.find();
          setFavoritedCharacters(favorites.map((fav) => fav.id)); // Store the favorited character ids
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchFavorites();
  }, []); // Fetch favorites when component mounts

// add fxn to handle favorites relation for logged in users
  const handleFavorite = async (characterId) => {
    const currentUser = Parse.User.current(); 

    if (!currentUser) { //user not logged in
      alert('You must be logged in to favorite a character!');//show a popup is user is not logged in
      return;
    }

    try {
      const Character = Parse.Object.extend('Characters');
      const query = new Parse.Query(Character);
      query.equalTo('objectId', characterId);
      const character = await query.first();

      if (character) {
        const favoritesRelation = currentUser.relation('favorites');
        
        // If the character is already in favorites, remove it
        if (favoritedCharacters.includes(characterId)) {
          favoritesRelation.remove(character);
          setFavoritedCharacters((prevFavorites) =>
            prevFavorites.filter((id) => id !== characterId)
          );
          console.log(`Character ${character.get('name')} removed from favorites.`);
        } else {
          // If not, add it
          favoritesRelation.add(character);
          setFavoritedCharacters((prevFavorites) => [...prevFavorites, characterId]);
          console.log(`Character ${character.get('name')} added to favorites.`);
        }

        await currentUser.save();
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  
//  add images to characterss
  const characterImages = {
    Sonic: sonicImage, 
    Knuckles: knucklesImage,
    Tails: tailsImage,
    Shadow: shadowImage,
    Rouge: rougeImage
  };

  return (
    <div className="container mt-4">
      {characters.length === 0 ? (
        <div className="alert alert-warning text-center">No characters found.</div>
      ) : (
        <div className="row">
          {characters.map((char) => (
              <div key={char.id} className="col-md-4 mb-4">
                <div className="card shadow-sm h-100" style={{ borderRadius: '15px', backgroundColor: '#f8f9fa' }}>
                  <img
                    src={characterImages[char.name.trim()] || defaultImage}
                    alt={char.name} 
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
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
  );
};

export default CharacterList;