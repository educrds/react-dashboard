import React from 'react';
import AuthButton from '../../components/AuthButton';
import Brand from '../../components/Brand';
import EmailInput from '../../components/Inputs/EmailInput';
import GoogleTag from '../../components/GoogleTag';
import PasswordInput from '../../components/Inputs/PasswordInput';
import './styles.scss';
import illustration from '../../assets/imgs/money-rafiki.png';

const AuthForm = () => {
  return (
    <div className='flex__container'>
      <div className='main__container'>
        <div className='brand'>
          <Brand />
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
        <AuthButton text='Entrar' onClick={() => {}} />
        <div className='create__account'>
          <p>
            Não tem uma conta? <a href=''>Criar agora</a>
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

export default AuthForm;
