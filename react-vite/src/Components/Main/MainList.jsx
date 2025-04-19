import React, { useEffect, useState } from "react";
import Parse from "parse"; 
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
    <div className="container d-flex flex-column justify-content-center align-items-center"   style={{ minHeight: "100vh"}}>      
      <div className="card shadow p-4" style={{ width: "400px", backgroundColor: "white", borderRadius: "15px" }}>
      <h2>Welcome, {user.get("username")}</h2>
      <p>Profile information:</p>
      <ul className="list-group mb-4">
          <li className="list-group-item"><strong>First Name:</strong> {user.get("firstName")}</li>
          <li className="list-group-item"><strong>Last Name:</strong> {user.get("lastName")}</li>
          <li className="list-group-item"><strong>Email:</strong> {user.get("email")}</li>
        </ul>
      {/* logout button added here */}
      <div className="text-center">
          <AuthLogout />
      </div>
     </div>
    </div>
  );
};

export default MainList;
