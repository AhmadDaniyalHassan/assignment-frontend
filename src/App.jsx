// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Signup from './components/Signup';
import Login from './components/Login';
import ProfilePage from './components/Profile';
import Home from './components/Home';
import EditVoucher from './components/EditVoucher';
function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className={`flex ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
        {isSidebarOpen && <Sidebar />}
        <div className="flex-1 p-4">
          <button className="text-white bg-gray-800 p-2" onClick={toggleSidebar}>
            {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/edit/:voucherId" element={<EditVoucher />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProfilePage />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
