import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Router>
      <nav>
  <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/login">Login</Link> | <Link to="/profile">Profile</Link>
</nav>

      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={ <ProtectedRoute>
      <Profile />
    </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
