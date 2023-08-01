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
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/Notes" element={<Notes />}></Route>
                <Route path="/About" element={<About />}></Route>
            </Routes>
        </div>
    );
}

export default App;
