import React, { useEffect, useState } from "react";
import Parse from "parse"; // Make sure you have Parse properly imported for checking the user
import AuthLogout from "../Auth/AuthLogout.jsx"; //want to add the logout button on the profile tab

/* STATEFUL PARENT COMPONENT */
const MainList = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  if (!user) {
    // If there's no logged-in user, you can render a message or redirect them to login
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      
      <h2>Welcome, {user.get("username")}</h2>
      <p>Profile information:</p>
      <ul>
        <li>First Name: {user.get("firstName")}</li>
        <li>Last Name: {user.get("lastName")}</li>
        <li>Email: {user.get("email")}</li>
      </ul>
      {/* logout button added here */}
      <hr />
      <AuthLogout />
    </div>
  );
};

export default MainList;
