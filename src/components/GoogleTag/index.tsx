import React from 'react';
import './styles.scss';
import { FcGoogle } from 'react-icons/fc';

type Props = {
  text: string;
  onClick: (value: string) => void;
};

const GoogleTag = ({ text, onClick }: Props) => (
  <button className='google-tag' onClick={onClick}>
    <div className='google-icon'>
      <FcGoogle />
    </div>
    <div className='text'>{text}</div>
  </button>
);

export default GoogleTag;
