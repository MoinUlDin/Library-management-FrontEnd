import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register, Home, AddMember } from "./pages";
import { BookRecords, Settings, Reports, IssueBook } from "./pages";
import { OnlineReservations, PendingApprovals } from "./pages";
import { RejectedApprovals, ReturnedBook, OnlineCatalogue } from "./pages";
import { DisableMember, Membership } from "./pages";
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
          {/* Book Management Routs*/}
          <Route path="books/record" element={<BookRecords />} />
          <Route path="books/issue" element={<IssueBook />} />
          <Route path="books/return" element={<ReturnedBook />} />
          <Route path="books/catalogue" element={<OnlineCatalogue />} />
          {/* Members Management Routs */}
          <Route path="members/add" element={<AddMember />} />
          <Route path="members/pending" element={<PendingApprovals />} />
          <Route path="members/rejected" element={<RejectedApprovals />} />
          <Route path="members/disable" element={<DisableMember />} />
          <Route path="members/plan" element={<Membership />} />
          {/*Online Reservations Routs */}
          <Route path="reservations" element={<OnlineReservations />} />
          {/*Reports Routs */}
          <Route path="reports" element={<Reports />} />
          {/*Settings Routs */}
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
