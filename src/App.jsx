import "./App.css";
import All from "./components/pages/All";
import Add from "./components/pages/Add";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Edit from "./components/pages/Edit";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<All />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
