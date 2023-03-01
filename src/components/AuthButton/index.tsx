import React from 'react';
import './styles.scss';

interface Props {
  onClick: () => void;
  text: string;
}

const AuthButton = ({ onClick, text }: Props) => {
  return (
    <button className='noselect auth__button' onClick={onClick}>
      <span className='text'>{text}</span>
    </button>
  );
};

export default AuthButton;
