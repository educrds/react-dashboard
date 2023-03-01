import React, { useState } from 'react';
import '../styles.scss';

interface Props {
  type: string;
  placeholder: string;
  name: string;
  label: string;
}

const Input = ({ type, placeholder, name, label, ...others }: Props) => {
  return (
    <div className='form__group field'>
      <input
        type={type}
        className='form__field'
        placeholder={placeholder}
        name={name}
        id={name}
        required
        {...others}
      />
      <label htmlFor={name} className='form__label'>
        {label}
      </label>
    </div>
  );
};

export default Input;
