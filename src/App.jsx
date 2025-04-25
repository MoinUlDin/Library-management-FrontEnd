import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashbordLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Home";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashbordLayout />}>
          <Route path="" element={<Home />} />
          <Route path="books" element={<h1>Book Management</h1>} />
        </Route>

        <Route
          path="/*"
          element={
            <h1 className="m-5 text-center text-5xl">Page Not Found 404</h1>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
