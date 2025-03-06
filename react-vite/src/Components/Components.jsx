import NavBar from "./Main/Navigation/NavBar.jsx";
import CharacterForm from "./Main/Forms/CharacterForm.jsx";
import OrderForm from "./Main/Forms/OrderForm.jsx";
import RingsForm from "./Main/Forms/RingForm.jsx";

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";


export default function Components () {
    return (
        <Router>
            <NavBar />
            <Routes>
            <Route path="/" element={<h1>Welcome to Green Hills</h1>} />
            <Route path="/characters" element={<CharacterForm />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/rings" element={<RingsForm />} />
            </Routes>
        </Router>
        );
}