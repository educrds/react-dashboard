import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Revenues from './pages/Revenue';
import Expenses from './pages/Expense';
import Transactions from './pages/Transactions';
import Navbar from './components/Navbar';
import Preferences from './pages/Preferences';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { NavbarContextProvider } from './contexts/NavbarContext';
import { Provider } from 'react-redux';
import { transactionsStore } from './services/redux/transactions/constants';
import authStore from './services/auth/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './styles/css/style.css';
import { ThemeContext } from './contexts/ThemeContext';

// const PrivateRoute = ({ element, ...rest }) => {
//   const isAuthenticated = useSelector(state => state.auth.userId !== null);

//   return isAuthenticated ? <Route {...rest} element={element} /> : <Navigate to='/' replace />;
// };

const App: React.FC = () => {
  const uid = localStorage.getItem('@Auth:uid');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${theme}`);
    console.log(theme);
  }, [theme]);


  return (
    <NavbarContextProvider>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <BrowserRouter>
          <Provider store={transactionsStore}>
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
                  {uid ? (
                    <>
                      <Route path='/dashboard' element={<Dashboard />} />
                      <Route path='/receitas' element={<Revenues />} />
                      <Route path='/despesas' element={<Expenses />} />
                      <Route path='/transacoes' element={<Transactions />} />
                      <Route path='/preferencias' element={<Preferences />} />
                    </>
                  ) : (
                    <Route path='*' element={<Navigate to='/' replace />} />
                  )}
                </Route>
              </Route>
            </Routes>
          </Provider>
        </BrowserRouter>
      </ThemeContext.Provider>
    </NavbarContextProvider>
  );
};

export default App;
