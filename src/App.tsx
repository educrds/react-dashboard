import React from 'react';
import AuthForm from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/css/style.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
