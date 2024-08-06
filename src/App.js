import "./App.css";
import Race from "./Race";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <div className="app-content">
                    <Routes>
                        <Route path="/" element={<Race />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
