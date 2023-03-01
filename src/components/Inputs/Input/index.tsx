import React, { useState } from 'react';
import '../styles.scss';

interface Props {
  type: string;
  placeholder: string;
  name: string;
  label: string;
}

const Input = ({ type, placeholder, name, label }: Props) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <div className='form__group field'>
      <input
        type={type}
        className='form__field'
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        name={name}
        id={name}
        required
      />
      <label htmlFor={name} className='form__label'>
        {label}
      </label>
    </div>
  );
};

export default Input;
