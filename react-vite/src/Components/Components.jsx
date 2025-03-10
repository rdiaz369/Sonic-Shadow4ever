import NavBar from "./Main/Navigation/NavBar.jsx";
import OrderForm from "./Main/Forms/OrderForm.jsx";
import RingsForm from "./Main/Forms/RingForm.jsx";
import React from 'react';
import CharacterForm from "./Main/Forms/CharacterForm.jsx";
// This is where we do our Routing


import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
//Use this import for routnign

//Use Routing from class to format

//Routes to Our Home page 

//Routes to other website OrderForm

// Rountes to Rings form
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