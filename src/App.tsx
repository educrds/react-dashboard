import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Revenues from './pages/Revenue';
import Expenses from './pages/Expense';
import Transactions from './pages/Transactions';
import Navbar from './components/Navbar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { NavbarContextProvider } from './contexts/NavbarContext';
import { Provider } from 'react-redux';
import { transactionsStore } from './services/transactions';
import authStore from './services/auth/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './styles/css/style.css';

// const PrivateRoute = ({ element, ...rest }) => {
//   const isAuthenticated = useSelector(state => state.auth.userId !== null);

//   return isAuthenticated ? <Route {...rest} element={element} /> : <Navigate to='/' replace />;
// };

const App: React.FC = () => {
  const uid = localStorage.getItem('@Auth:uid');

  return (
    <NavbarContextProvider>
      <BrowserRouter>
        {/* <Provider store={authStore}> */}
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
                  </>
                ) : (
                  <Route path='*' element={<Navigate to='/' replace />} />
                )}
              </Route>
            </Route>
          </Routes>
        </Provider>
        {/* </Provider> */}
      </BrowserRouter>
    </NavbarContextProvider>
  );
};

export default App;
