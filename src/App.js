import "./App.css";
import Home from "./Home";
import Race from "./Race";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <div className="app-content">
                    <Routes>
                        <Route path="/:raceInfo" element={<Race />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
