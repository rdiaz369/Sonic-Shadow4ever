import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Parse from "parse";
import 'bootstrap/dist/css/bootstrap.min.css';

import Components from "./Components/Components.jsx";

const Env = {
    APPLICATION_ID: "PKjKOcssJd3CaMrZjz9uZw22tqQuDFvDLnBXscHr",
    JAVASCRIPT_KEY: "krT5X3UCecte6PzouAcln3SzpRqIuPJ0cC2Gyv5x",
    SERVER_URL: "https://parseapi.back4app.com/"
}

// Initialize Parse
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
    return (
        <>
            <Components />
        </>
    );
}

export default App;