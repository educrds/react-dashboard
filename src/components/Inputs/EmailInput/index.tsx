import React, { useState } from 'react';
import '../styles.scss';

const PasswordInput = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  return (
    <div className='form__group field'>
      <input
        type='email'
        className='form__field'
        value={email}
        onChange={handleEmailChange}
        placeholder='Email'
        name='Email'
        id='Email'
        required
      />
      <label htmlFor='Email' className='form__label'>
        Email
      </label>
    </div>
  );
};

export default PasswordInput;
