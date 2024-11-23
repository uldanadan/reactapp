import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ApplicationSubmit from './components/Application/ApplicationSubmit/ApplicationSubmit';
import ApplicationList from './components/Application/ApplicationList/ApplicationList';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/application" element={<ApplicationSubmit />} />
          <Route path="/applications" element={<ApplicationList />} />
          <Route path="/manager" element={<Dashboard />} />
      </Routes>
  );
}

export default App;
