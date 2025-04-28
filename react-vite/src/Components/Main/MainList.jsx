import React, { useEffect, useState } from "react";
import Parse from "parse";
import AuthLogout from "../Auth/AuthLogout.jsx"; // Import logout button

/* STATEFUL PARENT COMPONENT */
const MainList = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Check if the user is logged in
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUser(currentUser);
      fetchFavorites(currentUser);
    }
  }, []);

  const fetchFavorites = async (currentUser) => {
    try {
      const favoritesRelation = currentUser.relation('favorites');
      const results = await favoritesRelation.query().find();

      const favoriteCharacters = results.map((char) => ({
        id: char.id,
        name: char.get('name'),
      }));

      setFavorites(favoriteCharacters);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  if (!user) {
    // If there's no logged-in user, you can render a message or redirect them to login
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="container mt-5 pt-5 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      {/* Profile Card */}
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "500px", backgroundColor: "white", borderRadius: "15px" }}>
        <h2>Welcome, {user.get("username")}</h2>
        <p>Profile information:</p>
        <ul className="list-group mb-4">
          <li className="list-group-item"><strong>First Name:</strong> {user.get("firstName")}</li>
          <li className="list-group-item"><strong>Last Name:</strong> {user.get("lastName")}</li>
          <li className="list-group-item"><strong>Email:</strong> {user.get("email")}</li>
        </ul>

        {/* Show favorite characters */}
        <div className="mb-4">
          <h4>My Favorite Characters</h4>
          {favorites.length === 0 ? (
            <p>You have no favorites yet.</p>
          ) : (
            <ul className="list-group">
              {favorites.map((char) => (
                <li key={char.id} className="list-group-item d-flex align-items-center justify-content-between">
                  <span>⭐ {char.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Logout button */}
        <div className="text-center">
          <AuthLogout />
        </div>
      </div>
    </div>
  );
};

export default MainList;
