import React from 'react';
import Brand from '../../components/Brand';
import GoogleTag from '../../components/GoogleTag';
import './styles.scss';

const Login = () => {
  return (
    <div className='container'>
      <div className='brand'>
        <Brand />
        <h3>Sua nova ferramenta para alcançar suas metas financeiras!</h3>
      </div>
      <GoogleTag text='Entrar com Google' />
    </div>
  );
};

export default Login;
