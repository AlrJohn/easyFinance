import React, {useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import Transactions from "./Transactions";
import AddTransaction from "./AddTransaction"

function App() {
  const [user, setUser] = useState(null);



  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={(userData) => setUser(userData)} />}
        />
        <Route
          path="/transactions"
          element={
            user ? <Transactions user={user} onSignOut={(userData) => setUser(userData)} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/add_transaction"
          element={user ? <AddTransaction user={user}/> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}




export default App
