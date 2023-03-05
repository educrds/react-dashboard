import React from 'react';
import './styles.scss';

type Props = {
  children: React.ReactNode;
  isCollapsed: boolean;
};

const Wrapper: React.FC<Props> = ({ children, isCollapsed }) => (
  <div className={`wrapper ${isCollapsed && 'collapsed'}`}>{children}</div>
);
export default Wrapper;
