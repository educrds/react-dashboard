import React, { useState, useContext } from 'react';
import Brand from '../Brand';
import {
  TrendingUpOutlined,
  TrendingDownOutlined,
  GridViewOutlined,
  ReceiptLongOutlined,
  ExitToAppOutlined,
  KeyboardArrowRightRounded,
  KeyboardArrowLeftRounded,
  Settings,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { NavbarContext } from '../../contexts/NavbarContext';
import AddButtonMenu from '../AddMenu';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import './styles.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { handleCollapseToggle, isCollapsed } = useContext(NavbarContext);

  const handleClick = (index: number | null): void => setActiveIndex(index);
  const renderText = (text: string): JSX.Element | null =>
    !isCollapsed ? <span>{text}</span> : null;

  return (
    <nav className={`${isCollapsed && 'collapsed'}`}>
      <div className={'nav__wrapper'}>
        <Brand />
        <ColapseButton onClick={handleCollapseToggle} collapsed={isCollapsed} />
        <div className='nav__menu'>
          <AddButtonMenu collapsed={isCollapsed} />
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
            collapsed={isCollapsed}
            onClick={() => handleClick(3)}
            isActive={activeIndex === 3}
            to='/transacoes'
          />
          <NavButton
            icon={<Settings />}
            text={renderText('Preferências')}
            collapsed={isCollapsed}
            onClick={() => handleClick(4)}
            isActive={activeIndex === 4}
            to='/preferencias'
          />
        </div>
        <ToggleThemeButton collapsed={isCollapsed} />
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
    <NavLink className={`nav__button__container ${isActive && 'active'}`} to={to} onClick={onClick}>
      <div>
        {icon}
        {!collapsed ? <span>{text}</span> : null}
      </div>
    </NavLink>
  );
};

interface ColapseButtonProps {
  onClick: () => void;
  collapsed: boolean;
}

const ColapseButton = ({ onClick, collapsed }: ColapseButtonProps) => {
  return (
    <div className='nav__toggle' onClick={onClick}>
      {collapsed ? <KeyboardArrowRightRounded /> : <KeyboardArrowLeftRounded />}
    </div>
  );
};

const ToggleThemeButton = ({ collapsed }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [alignment, setAlignment] = React.useState(theme);

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    const buttonClicked = event.target.value;

    if (collapsed) {
      setTheme(buttonClicked === 'dark' ? 'light' : 'dark');
      setAlignment(buttonClicked === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(buttonClicked === 'dark' ? 'dark' : 'light');
      setAlignment(buttonClicked);
    }
  };

  if (collapsed) {
    return (
      <ToggleButtonGroup
        color='primary'
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label='Platform'
        className='toggle__theme__container'
      >
        <ToggleButton value={alignment}>{alignment}</ToggleButton>
      </ToggleButtonGroup>
    );
  }

  return (
    <ToggleButtonGroup
      color='primary'
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label='Platform'
      className='toggle__theme__container'
    >
      <ToggleButton value='light'>Light</ToggleButton>
      <ToggleButton value='dark'>Dark</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default Navbar;
