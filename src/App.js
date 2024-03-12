import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";
function App() {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/Read" element={<Read />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
}



export default App;
