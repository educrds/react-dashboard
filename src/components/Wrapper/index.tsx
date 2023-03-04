import React from 'react';
import './styles.scss';

type Props = {
  children: React.ReactNode;
};

const Wrapper: React.FC<Props> = ({ children }) => {
  return <div className='wrapper'>{children}</div>;
};

export default Wrapper;
