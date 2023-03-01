import React from 'react';
import './styles.scss';
import { FcGoogle } from 'react-icons/fc';

type Props = {
  text: string;
};

const GoogleTag = ({ text }: Props) => (
  <button className='google-tag'>
    <div className='google-icon'>
      <FcGoogle />
    </div>
    <div className='text'>{text}</div>
  </button>
);

export default GoogleTag;
