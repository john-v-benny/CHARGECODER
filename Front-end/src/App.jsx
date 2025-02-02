import React from "react";
import Sign_in from "./Sign_in";
import Landing from "./Landing";
import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Sign_in />} />
                <Route path="/Landing" element={<Landing />} />
            </Routes>
        </Router>
    )
}

export default App;