import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../styles.scss';

const PasswordInput = ({ ...others }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='form__group field'>
      <input
        type={showPassword ? 'text' : 'password'}
        className='form__field'
        placeholder='Senha'
        name='Senha'
        id='Senha'
        required
        {...others}
      />
      <label htmlFor='Senha' className='form__label'>
        Senha
      </label>
      <button type='button' className='form__show' onClick={handleTogglePasswordVisibility}>
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
