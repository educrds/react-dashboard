import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './styles.scss';

const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='form__group field'>
      <input
        type={showPassword ? 'text' : 'password'}
        className='form__field'
        value={password}
        onChange={handlePasswordChange}
        placeholder='Senha'
        name='Senha'
        id='Senha'
        required
      />
      <label htmlFor='Senha' className='form__label'>
        Senha
      </label>
      <button type='button' className='form__show' onClick={handleTogglePasswordVisibility}>
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
    </div>
  );

  return (
    <div className='input__container'>
      <label className='input__label' htmlFor='password'>
        Password
      </label>
      <div>
        <input
          type={showPassword ? 'text' : 'password'}
          id='password'
          name='password'
          value={password}
          placeholder='Insira sua senha'
          onChange={handlePasswordChange}
        />
        <button type='button' onClick={handleTogglePasswordVisibility}>
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
