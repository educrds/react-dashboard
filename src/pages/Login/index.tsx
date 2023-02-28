import React from 'react';
import AuthButton from '../../components/AuthButton';
import Brand from '../../components/Brand';
import EmailInput from '../../components/EmailInput';
import GoogleTag from '../../components/GoogleTag';
import PasswordInput from '../../components/PasswordInput';
import './styles.scss';

const AuthForm = () => {
  return (
    <div className='main__container'>
      <div className='brand'>
        <Brand />
        <h3>Sua nova ferramenta para alcançar suas metas financeiras!</h3>
      </div>
      <GoogleTag text='Entrar com Google' />
      <div className='container'>
        <hr className='line' />
        <p>OU</p>
        <hr className='line' />
      </div>
      <EmailInput />
      <PasswordInput />
      <div className='forget__password'>
        <a href='' target='__blank'>
          <u>Esqueci minha senha</u>
        </a>
      </div>
      <AuthButton text='Entrar' />
      <div className='create__account'>
        <p>
          Não tem uma conta? <a href=''>Criar agora</a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
