import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import './styles/css/style.css';
import Dashboard from './pages/Dashboard';
import Revenue from './pages/Revenue';
import Expense from './pages/Expense';
import Transactions from './pages/Transactions';
import Navbar from './components/Navbar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Outlet />}>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            element={
              <>
                <Navbar />
                <Outlet />
              </>
            }
          >
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/receitas' element={<Revenue />} />
            <Route path='/despesas' element={<Expense />} />
            <Route path='/transacoes' element={<Transactions />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
