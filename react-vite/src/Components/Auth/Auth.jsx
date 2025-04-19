import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./AuthService";

const AuthModule = () => {
    const navigate = useNavigate(); 

    // Redirect already authenticated users back to home
    useEffect(() => {
        if (checkUser()) {
            alert("You are already logged in");
            navigate("/");
        }
    }, [navigate]);

    // add bootstrap styling to root page
    return (
      <div className="container d-flex justify-content-center align-items-center" >
          <div className="card p-4 shadow" style={{ width: "400px" }}>
            <h2 className="text-center mb-4">Welcome to Green Hills!</h2>
              <Link to="/register">
                <button className="btn btn-outline-success btn-lg">Register</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-outline-success btn-lg">Login</button>
              </Link>
            </div>
      </div>
      );
};

export default AuthModule;
