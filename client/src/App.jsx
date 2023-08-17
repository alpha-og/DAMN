// react imports
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom"; // client side routing components
import { addSubject } from "./store/subjectsSlice.js";
// component imports
import { Footer, Nav } from "./components/components.js";
import { About, Home, Notes, PageNotFound } from "./pages/pages.js";
// module imports
import axios from "axios";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        axios
            .get(
                `https://api.github.com/repos/alpha-og/42-Data-Science-AI-ML-and-DL/contents/`
            )
            .then((res) =>
                res.data.forEach((subject) => {
                    subject.name !== ".gitignore" &&
                        dispatch(addSubject(subject));
                })
            )
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="overflow-x-hidden">
            <Nav />
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
