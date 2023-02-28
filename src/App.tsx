import React from 'react';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/css/style.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
