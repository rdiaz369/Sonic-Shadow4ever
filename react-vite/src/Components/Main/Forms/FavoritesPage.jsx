import { useEffect, useState } from 'react';
import Parse from 'parse';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        console.log('No user is logged in');
        return;
      }

      const favoritesRelation = currentUser.relation('favorites');
      const query = favoritesRelation.query();
      try {
        const results = await query.find();
        const favoriteData = results.map((char) => ({
          id: char.id,
          name: char.get('name'),
        }));
        setFavorites(favoriteData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []); // Fetch favorites when the component mounts

  return (
    <div>
      <h3>Your Favorite Characters</h3>
      {favorites.length === 0 ? (
        <p>You have no favorite characters.</p>
      ) : (
        <ul>
          {favorites.map((char) => (
            <li key={char.id}>{char.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
