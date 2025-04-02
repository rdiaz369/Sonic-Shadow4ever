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

    return (
        <div>
            <Link to="/register">
                <button>Register</button>
            </Link>
            <br />
            <br />
            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
    );
};

export default AuthModule;
