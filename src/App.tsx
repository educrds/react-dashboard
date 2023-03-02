import React from 'react';
import Login from './pages/Auth/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/css/style.css';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import Revenue from './pages/Revenue';
import Expense from './pages/Expense';
import Transactions from './pages/Transactions';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/receitas' element={<Revenue />} />
        <Route path='/despesas' element={<Expense />} />
        <Route path='/transacoes' element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
