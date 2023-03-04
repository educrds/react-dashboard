import React, { useState } from 'react';
import Brand from '../Brand';
import './styles.scss';
import {
  TrendingUpOutlined,
  TrendingDownOutlined,
  GridViewOutlined,
  ReceiptLongOutlined,
  ExitToAppOutlined,
  AddOutlined,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = index => setActiveIndex(index);

  return (
    <nav>
      <div className='nav__container'>
        <Brand />
        <div className='nav__menu'>
          <AddButton onClick={() => {}} />
          <NavButton
            icon={<GridViewOutlined />}
            text='Dashboard'
            onClick={() => handleClick(0)}
            isActive={activeIndex === 0}
            to='/dashboard'
          />
          <NavButton
            icon={<TrendingUpOutlined />}
            text='Receitas'
            onClick={() => handleClick(1)}
            isActive={activeIndex === 1}
            to='/receitas'
          />
          <NavButton
            icon={<TrendingDownOutlined />}
            text='Despesas'
            onClick={() => handleClick(2)}
            isActive={activeIndex === 2}
            to='/despesas'
          />
          <NavButton
            icon={<ReceiptLongOutlined />}
            text='Transações'
            onClick={() => handleClick(3)}
            isActive={activeIndex === 3}
            to='/transacoes'
          />
        </div>
        <LogoutButton onClick={() => {}} />
      </div>
    </nav>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  isActive: boolean;
  to: string;
}

const NavButton = ({ icon, text, onClick, isActive, to }: NavButtonProps) => {
  return (
    <NavLink className={`nav__button__container ${isActive && 'active'}`} to={to} onClick={onClick}>
      <div>
        {icon}
        <span>{text}</span>
      </div>
    </NavLink>
  );
};

interface AddButtonProps {
  onClick: () => void;
}

const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <div className='nav__button__container add__button' onClick={onClick}>
      <div>
        <AddOutlined />
        <span>Novo</span>
      </div>
    </div>
  );
};

interface LogoutButtonProps {
  onClick: () => void;
}

const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <div className='logout__button' onClick={onClick}>
      <ExitToAppOutlined />
      Sair
    </div>
  );
};
export default Navbar;
