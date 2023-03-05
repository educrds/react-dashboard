import React, { useState, useContext } from 'react';
import Brand from '../Brand';
import './styles.scss';
import {
  TrendingUpOutlined,
  TrendingDownOutlined,
  GridViewOutlined,
  ReceiptLongOutlined,
  ExitToAppOutlined,
  AddOutlined,
  KeyboardDoubleArrowRightOutlined,
  KeyboardDoubleArrowLeftOutlined,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { NavbarContext } from '../../contexts/NavbarContext';

const Navbar = ({ toggleClick, isCollapsed }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { collapsed } = useContext(NavbarContext);

  const handleClick = (index: number): void => setActiveIndex(index);
  const renderText = (text: string): JSX.Element | null => {
    return !collapsed ? <span>{text}</span> : null;
  };

  return (
    <nav className={`${isCollapsed && 'collapsed'}`}>
      <div className={'nav__wrapper'}>
        <Brand />
        <div className='nav__toggle' onClick={toggleClick}>
          {isCollapsed ? <KeyboardDoubleArrowRightOutlined /> : <KeyboardDoubleArrowLeftOutlined />}
        </div>
        <div className='nav__menu'>
          <AddButton onClick={() => {}} text={renderText('Novo')} collapsed={isCollapsed} />
          <NavButton
            icon={<GridViewOutlined />}
            text={renderText('Dashboard')}
            collapsed={isCollapsed}
            onClick={() => handleClick(0)}
            isActive={activeIndex === 0}
            to='/dashboard'
          />
          <NavButton
            icon={<TrendingUpOutlined />}
            text={renderText('Receitas')}
            collapsed={isCollapsed}
            onClick={() => handleClick(1)}
            isActive={activeIndex === 1}
            to='/receitas'
          />
          <NavButton
            icon={<TrendingDownOutlined />}
            text={renderText('Despesas')}
            collapsed={isCollapsed}
            onClick={() => handleClick(2)}
            isActive={activeIndex === 2}
            to='/despesas'
          />
          <NavButton
            icon={<ReceiptLongOutlined />}
            text={renderText('Transações')}
            collapsed={collapsed}
            onClick={() => handleClick(3)}
            isActive={activeIndex === 3}
            to='/transacoes'
          />
        </div>
        <LogoutButton onClick={() => {}} text={renderText('Sair')} />
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
  collapsed: boolean;
}

const NavButton = ({ icon, text, onClick, isActive, to, collapsed }: NavButtonProps) => {
  return (
    <NavLink
      className={`nav__button__container ${isActive && 'active'}`}
      to={to}
      onClick={onClick}
    >
      <div>
        {icon}
        {!collapsed ? <span>{text}</span> : null}
      </div>
    </NavLink>
  );
};

interface AddButtonProps {
  onClick: () => void;
  text: string;
  collapsed: boolean;
}

const AddButton = ({ onClick, text, collapsed }: AddButtonProps) => {
  return (
    <div
      className={`nav__button__container add__button`}
      onClick={onClick}
    >
      <div>
        <AddOutlined />
        {!collapsed ? <span>{text}</span> : null}
      </div>
    </div>
  );
};

interface LogoutButtonProps {
  onClick: () => void;
  text: string;
}

const LogoutButton = ({ onClick, text }: LogoutButtonProps) => {
  return (
    <div className='logout__button' onClick={onClick}>
      <ExitToAppOutlined />
      {text}
    </div>
  );
};

export default Navbar;
