import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as Env from "./enviroments.js"
import Parse from "parse";

import Components from "./Components/Components.jsx";


// This will connect your front end and your back end {
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;
// }

function App() {
    return <Components />;
}

export default App
