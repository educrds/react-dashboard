import React, { useState } from 'react';
import reactLogo from './react.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
