import NavBar from "./Main/Navigation/NavBar.jsx";
import OrderForm from "./Main/Forms/OrderForm.jsx";
import RingsForm from "./Main/Forms/RingForm.jsx";
import React from 'react';
import CharacterForm from "./Main/Forms/CharacterForm.jsx";
//import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AuthModule from "./Auth/Auth.jsx";
import AuthRegister from "./Auth/AuthRegister.jsx";
import AuthLogin from "./Auth/AuthLogin.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import MainList from "./Main/MainList.jsx";


export default function Components () {
    return (
        <Router>
            <NavBar />
            <Routes>
                {/* Public Routes */}
            <Route path="/home" element={<CharacterForm />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/rings" element={<RingsForm />} />
            {/* Authenticated routes */}
            <Route path="/register" element={<AuthRegister />} />
            <Route path="/login" element={<AuthLogin />} />
            {/* Protected Routes */}
            <Route
          path="/"
          element={<ProtectedRoute path="/" element={MainList} />}
        />
            </Routes>
        </Router>   
        );
}