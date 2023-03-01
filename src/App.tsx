import React from 'react';
import Login from './pages/Auth/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/css/style.css';
import Register from './pages/Auth/Register';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
