import React, { useState } from 'react';
import Brand from '../Brand';
import './styles.scss';
import {
  MdOutlineGridView,
  MdOutlineReceiptLong,
  MdOutlineNorthEast,
  MdOutlineSouthWest,
  MdOutlineLogout,
} from 'react-icons/md';
import { BiPlus } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = index => {
    setActiveIndex(index);
  };

  return (
    <nav>
      <div className='nav__container'>
        <Brand />
        <div className='nav__menu'>
          <AddButton onClick={() => {}} />
          <NavButton
            icon={<MdOutlineGridView />}
            text='Dashboard'
            onClick={() => handleClick(0)}
            isActive={activeIndex === 0}
            to='/dashboard'
          />
          <NavButton
            icon={<MdOutlineNorthEast />}
            text='Receitas'
            onClick={() => handleClick(1)}
            isActive={activeIndex === 1}
            to='/receitas'
          />
          <NavButton
            icon={<MdOutlineSouthWest />}
            text='Despesas'
            onClick={() => handleClick(2)}
            isActive={activeIndex === 2}
            to='/despesas'
          />
          <NavButton
            icon={<MdOutlineReceiptLong />}
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
        <BiPlus />
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
      <MdOutlineLogout />
      Sair
    </div>
  );
};
export default Navbar;
