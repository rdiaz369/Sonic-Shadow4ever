import NavBar from "./Main/Navigation/NavBar.jsx";
import CharacterForm from "./Main/Forms/CharacterForm.jsx";
import OrderForm from "./Main/Forms/OrderForm.jsx";
import RingsForm from "./Main/Forms/RingForm.jsx";
import Main from "./Main/Main.jsx";
import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserCollections from './UserCollections/UserCollections';
//import './App.css';
//Components.jsx
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";


export default function Components () {
    return (
        <Router>
            <NavBar />
            <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/characters" element={<CharacterForm />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/rings" element={<RingsForm />} />
            <Route path="/" element={<UserCollections />} />
            <Route path="/collections" element={<UserCollections />} />
            </Routes>
        </Router>
        );
}