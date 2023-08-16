// react imports
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// file imports
import { Footer, Navbar } from "./components/components.js";
import { About, Home, Notes, PageNotFound } from "./pages/pages.js";

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/notes" element={<Notes />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/*" element={<PageNotFound />}></Route>
            </Routes>
            <Footer></Footer>
        </div>
    );
}

export default App;
