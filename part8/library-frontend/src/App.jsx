import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  return (
    <Router>
      <div className="links">
        <Link to="/authors">authors</Link>
        <Link to="/books">books</Link>
        <Link to="/add">add book</Link>
      </div>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </Router>
  );
};

export default App;
