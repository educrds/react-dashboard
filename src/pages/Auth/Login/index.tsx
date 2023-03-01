import React, { useState } from 'react';
import AuthButton from '../../../components/AuthButton';
import Brand from '../../../components/Brand';
import GoogleTag from '../../../components/GoogleTag';
import PasswordInput from '../../../components/Inputs/PasswordInput';
import '../styles.scss';
import illustration from '../../../assets/imgs/money-rafiki.png';
import Input from '../../../components/Inputs/Input';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleLoginClick = event => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  return (
    <div className='flex__container'>
      <div className='main__container'>
        <Brand />
        <GoogleTag text='Entrar com Google' />
        <Line />
        <Input
          type='email'
          placeholder='Email'
          name='email'
          label='Email'
          onChange={handleEmailChange}
          value={email}
        />
        <PasswordInput onChange={handlePasswordChange} value={password} />
        <ForgetPassword />
        <AuthButton text='Entrar' onClick={HandleLoginClick} />
        <CreateAccount />
      </div>
      <Illustration />
    </div>
  );
};

const Line = () => {
  return (
    <div className='container'>
      <hr className='line' />
      <p>OU</p>
      <hr className='line' />
    </div>
  );
};

const ForgetPassword = () => {
  return (
    <div className='forget__password'>
      <a href='' target='__blank'>
        <u>Esqueci minha senha</u>
      </a>
    </div>
  );
};

const CreateAccount = () => {
  return (
    <div className='create__account'>
      <p>
        Não tem uma conta? <Link to={'/register'}>Criar agora</Link>
      </p>
    </div>
  );
};

const Illustration = () => {
  return (
    <div className='illustration'>
      <h2>
        Sua nova ferramenta para alcançar <br /> suas metas financeiras!
      </h2>
      <img src={illustration} alt='' />
    </div>
  );
};
export default Login;
