// react imports
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
// file imports
import { About, Home, Navbar, Notes } from "./components/components.js";

function App() {
    return (
        <>
            <Navbar />
            <h1>This is the App</h1>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/Notes" element={<Notes />}></Route>
                <Route path="/About" element={<About />}></Route>
            </Routes>
        </>
    );
}

export default App;
