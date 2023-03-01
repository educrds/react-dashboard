import React from 'react';
import AuthButton from '../../../components/AuthButton';
import Brand from '../../../components/Brand';
import GoogleTag from '../../../components/GoogleTag';
import PasswordInput from '../../../components/Inputs/PasswordInput';
import '../styles.scss';
import illustration from '../../../assets/imgs/money-rafiki.png';
import Input from '../../../components/Inputs/Input';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='flex__container'>
      <div className='main__container'>
        <div className='brand'>
          <Brand />
        </div>
        <GoogleTag text='Cadastre-se com Google' />
        <div className='container'>
          <hr className='line' />
          <p>OU</p>
          <hr className='line' />
        </div>
        <Input type='nome' placeholder='Nome' name='nome' label='Nome' />
        <Input type='email' placeholder='Email' name='email' label='Email' />
        <PasswordInput />
        <AuthButton text='Cadastrar' onClick={() => {}} />
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
