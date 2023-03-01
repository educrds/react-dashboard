import React from 'react';
import AuthForm from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/css/style.css';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthForm />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
