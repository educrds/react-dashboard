import React from 'react';
import AuthButton from '../../../components/AuthButton';
import Brand from '../../../components/Brand';
import GoogleTag from '../../../components/GoogleTag';
import PasswordInput from '../../../components/Inputs/PasswordInput';
import '../styles.scss';
import illustration from '../../../assets/imgs/money-rafiki.png';
import Input from '../../../components/Inputs/Input';
import { Link } from 'react-router-dom';

const HandleLoginClick = () => {
  return;
};

const Login = () => {
  return (
    <div className='flex__container'>
      <div className='main__container'>
        <Brand />
        <GoogleTag text='Entrar com Google' />
        <Line />
        <Input type='email' placeholder='Email' name='email' label='Email' />
        <PasswordInput />
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
