import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import EditResume from "./pages/editResume";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resumes" element={<Resume />} />
        <Route path="/edit-resume" element={<EditResume />} />
      </Routes>
    </Router>
  );
}

export default App;
