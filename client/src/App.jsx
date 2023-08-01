// react imports
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
// file imports
import { Navbar } from "./components/components.js";
import { About, Home, Notes } from "./pages/pages.js";

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/home" element={<Home />}></Route>
                <Route exact path="/Notes" element={<Notes />}></Route>
                <Route exact path="/About" element={<About />}></Route>
            </Routes>
        </div>
    );
}

export default App;
