import React from "react";
import ReactDom from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import { StateProvider } from "./Context/StateProvider";
import { initialState } from "./Context/initialState";
import reducer from "./Context/reducer";

ReactDom.render(
    <React.StrictMode>
        <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
        </Router>
        

       
    </React.StrictMode>
,document.getElementById('root'))