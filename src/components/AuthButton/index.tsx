import React from 'react';
import './styles.scss';
import { BsArrowRightShort } from 'react-icons/bs';

interface Props {
  onClick: () => void;
  text: string;
}

const AuthButton = ({ onClick, text }: Props) => {
  return (
    <button className='noselect auth__button' onClick={onClick}>
      <span className='text'>{text}</span>
      <span className='icon'>
        <BsArrowRightShort />
      </span>
    </button>
  );
};

export default AuthButton;
