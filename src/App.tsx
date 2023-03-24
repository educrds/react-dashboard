import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Revenue from './pages/Revenue';
import Expenses from './pages/Expense';
import Transactions from './pages/Transactions';
import Navbar from './components/Navbar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { NavbarContextProvider } from './contexts/NavbarContext';
import { Provider } from 'react-redux';
import { store } from './services/transactions';
import './styles/css/style.css';

const App: React.FC = () => {
  return (
    <NavbarContextProvider>
      <BrowserRouter>
        <Provider store={store}>
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
                <Route path='/despesas' element={<Expenses />} />
                <Route path='/transacoes' element={<Transactions />} />
              </Route>
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </NavbarContextProvider>
  );
};

export default App;
