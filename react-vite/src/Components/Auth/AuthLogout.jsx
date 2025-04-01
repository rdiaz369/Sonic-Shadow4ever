
import React, { useEffect, useState } from "react";
import { checkUser } from "./AuthService";
import { useNavigate } from "react-router-dom";
import Parse from "parse";  

const AuthLogout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = Parse.User.current();  // get current logged-in user
    if (currentUser) {
      setUser(currentUser);  
    } else {
      navigate("/login");  // redirect to login if no user is logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    // lg out the user using Parse's logOut method
    Parse.User.logOut().then(() => {
      alert("You have been logged out :P");
      navigate("/"); // Redirect to the login page after logging out
    });
  };

  if (!user) {
    return <div>Loading...</div>;  // just show smth to use while checking the user
  }

  return (
    <div>
      <h3>Are you sure you want to log out?</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AuthLogout;
