import React, { useState } from 'react';
import AuthButton from '../../../components/AuthButton';
import Brand from '../../../components/Brand';
import GoogleTag from '../../../components/GoogleTag';
import PasswordInput from '../../../components/Inputs/PasswordInput';
import '../styles.scss';
import illustration from '../../../assets/imgs/money-rafiki.png';
import Input from '../../../components/Inputs/Input';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../services/firebaseConfig';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleRegisterClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setEmail(event.target.value);

  const handlePasswordChange = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setPassword(event.target.value);

  const handleRegisterWithGoogle = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  return (
    <div className='flex__container'>
      <div className='main__container'>
        <Brand />
        <GoogleTag text='Cadastre-se com Google' onClick={handleRegisterWithGoogle} />
        <div className='container'>
          <hr className='line' />
          <p>OU</p>
          <hr className='line' />
        </div>
        <Input
          type='email'
          placeholder='Email'
          name='email'
          label='Email'
          onChange={handleEmailChange}
          value={email}
        />
        <PasswordInput onChange={handlePasswordChange} value={password} />
        <AuthButton text='Cadastrar' onClick={HandleRegisterClick} />
        <div className='create__account'>
          <p>
            Já tem uma conta? <Link to={'/'}> Entrar</Link>
          </p>
        </div>
      </div>
      <div className='illustration'>
        <h2>
          Sua nova ferramenta para alcançar <br /> suas metas financeiras!
        </h2>
        <img src={illustration} alt='' />
      </div>
    </div>
  );
};

export default Register;
