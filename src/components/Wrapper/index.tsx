import React, { useContext } from 'react';
import { NavbarContext } from '../../contexts/NavbarContext';
import './styles.scss';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { isCollapsed } = useContext(NavbarContext);
  return <div className={`wrapper ${isCollapsed && 'collapsed'}`}>{children}</div>;
};

export default Wrapper;
