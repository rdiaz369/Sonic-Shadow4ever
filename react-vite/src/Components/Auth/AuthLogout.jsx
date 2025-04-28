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
      alert("You have been logged out!");
      navigate("/"); // Redirect to the login page after logging out
    });
  };

  // add boostrap
  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" >
      <div className="card p-5 shadow" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4" style={{ color: "green" }} >Log Out</h3>
        <p className="text-center"style={{ color: "black" }}>Are you sure you want to log out, <strong>{user.get("firstName") || "User"}</strong>?</p>
        <div className="d-grid">
          <button onClick={handleLogout} className="btn btn-outline-danger" >
            Confirm Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthLogout;