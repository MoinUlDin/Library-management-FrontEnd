import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Login,
  Register,
  Home,
  MemberManagement,
  BookManagement,
  OnlineReservations,
  Settings,
  Reports,
} from "./pages";
import DashbordLayout from "./components/DashboardLayout";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashbordLayout />}>
          <Route path="" element={<Home />} />
          <Route path="books/records" element={<BookManagement />} />
          <Route path="members" element={<MemberManagement />} />
          <Route path="reservations" element={<OnlineReservations />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
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
