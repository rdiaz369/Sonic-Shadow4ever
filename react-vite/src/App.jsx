import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// This is where we import parsing
import Parse from "parse";

// This is where we have our routing
import Components from "./Components/Components.jsx";

// this is where we input our back4App data to acces out info
const Env = {
    APPLICATION_ID: "PKjKOcssJd3CaMrZjz9uZw22tqQuDFvDLnBXscHr",
    JAVASCRIPT_KEY: "krT5X3UCecte6PzouAcln3SzpRqIuPJ0cC2Gyv5x",
    SERVER_URL: "https://parseapi.back4app.com/"
}
// Make sure to npm i parse

// Initialize Parse
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

// this is where we call on Components to render it out
function App() {
    console.log(Env.APPLICATION_ID); 
    return (
        <>
            <Components />
        </>
    );
}

export default App;