import NavBar from "./Main/Navigation/NavBar.jsx";
import RingsForm from "./Main/Forms/RingForm.jsx";
import React from 'react';
import CharacterForm from "./Main/Forms/CharacterForm.jsx";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AuthModule from "./Auth/Auth.jsx";
import AuthRegister from "./Auth/AuthRegister.jsx";
import AuthLogin from "./Auth/AuthLogin.jsx";
import AuthLogout from "./Auth/AuthLogout.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import MainList from "./Main/MainList.jsx";
import SonicQuiz from "./Quiz/QuizComponent.jsx"; // add this at top
import ResetPassword from "./Auth/ResetPassword.jsx";

//import CharacterList from "../database/queries/CharacterList.jsx"

export default function Components () {
    return (
        <Router>
            <NavBar />
            <Routes>
                {/* Public Routes */}
            <Route path="/home" element={<CharacterForm />} />
            <Route path="/rings" element={<RingsForm />} />
            <Route path="/quiz" element={<SonicQuiz />} />

            {/* Authenticated routes */}
            <Route path="/" element={<AuthModule />} />
            <Route path="/register" element={<AuthRegister />} />
            <Route path="/login" element={<AuthLogin />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route
          path="/profile"
          element={<ProtectedRoute path="/profile" element={MainList} />}
        />
            </Routes>
        </Router>   
        );
}