// react imports
import { Route, Routes } from "react-router-dom";
// file imports
import { Navbar } from "./components/components.js";
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
        </div>
    );
}

export default App;
