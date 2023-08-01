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
                <Route path="/DAMN/" element={<Home />}></Route>
                <Route path="/DAMN/home" element={<Home />}></Route>
                <Route path="/DAMN/Notes" element={<Notes />}></Route>
                <Route path="/DAMN/About" element={<About />}></Route>
            </Routes>
        </div>
    );
}

export default App;
