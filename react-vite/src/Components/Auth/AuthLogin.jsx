import React, { useEffect, useState } from "react";
import { checkUser, loginUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import Parse from "parse";

const AuthLogin = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
  });
  const [add, setAdd] = useState(false);

  // Check if the user is already logged in
  useEffect(() => {
    const user = checkUser(); // Call your checkUser function to get the current user

    if (user) {
      // If user is logged in, show alert and redirect to profile
      alert("You are already logged in. Redirecting to your profile.");
      navigate("/profile"); // Redirect to profile
    }
  }, [navigate]);

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    if (currentUser && add) {
      loginUser(currentUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          alert(
            `${userLoggedIn.get("firstName")}, you successfully logged in!`
          );
          navigate("/profile");
        }
        setAdd(false);
      });
    }
  }, [navigate, currentUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;

    setCurrentUser({
      ...currentUser,
      [name]: newValue,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <AuthForm
          user={currentUser}
          isLogin={true}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
        />
      </div>
    </div>
  );
};

export default AuthLogin;
