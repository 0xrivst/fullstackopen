import { useApolloClient } from "@apollo/client";
import { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <Router>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <div className="links">
        <Link to="/authors">authors</Link>
        <Link to="/books">books</Link>
        {token ? (
          <>
            <Link to="/add">add book</Link>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <Link to="/login">login</Link>
        )}
      </div>
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook setError={notify} />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setError={notify} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
