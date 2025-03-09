import NavBar from "./Main/Navigation/NavBar.jsx";
import OrderForm from "./Main/Forms/OrderForm.jsx";
import RingsForm from "./Main/Forms/RingForm.jsx";
import React from 'react';
import CharacterForm from "./Main/Forms/CharacterForm.jsx";
//import './App.css';
//Components.jsx
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";


export default function Components () {
    return (
        <Router>
            <NavBar />
            <Routes>
            <Route path="/" element={<CharacterForm />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/rings" element={<RingsForm />} />
            </Routes>
        </Router>
        );
}