import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../container/Login/loginForm';
import auth from '../services/authService';

const ProtectedRoute = ({ path, element }) => {
  const user = auth.getCurrentUser();

  return (
    <Routes>
      <Route path={path} element={user ? element : <Login />} />
    </Routes>
  );
};

export default ProtectedRoute;
