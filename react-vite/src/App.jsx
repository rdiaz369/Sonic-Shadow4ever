import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Parse from "parse";


import Components from "./Components/Components.jsx";

const Env = {
    APPLICATION_ID: "x9VHmPclyWUGBSfJu3yKWpz8O6XEVOQUaFGPspPH",
    JAVASCRIPT_KEY: "mh8k1ktEzjCnRXY4rLnQBi2ojtax4yv35y93Z5gY",
    SERVER_URL: "https://parseapi.back4app.com"
}

// Initialize Parse
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
    console.log(Env.APPLICATION_ID); 
    return (
        <>
            <Components />
        </>
    );
}

export default App;