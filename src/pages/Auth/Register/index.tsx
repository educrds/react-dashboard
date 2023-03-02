import React, { useState } from 'react';
import AuthButton from '../../../components/AuthButton';
import Brand from '../../../components/Brand';
import GoogleTag from '../../../components/GoogleTag';
import PasswordInput from '../../../components/Inputs/PasswordInput';
import '../styles.scss';
import illustration from '../../../assets/imgs/money-rafiki.png';
import Input from '../../../components/Inputs/Input';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebaseConfig';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Responsável por criar uma nova conta de usuário com email e senha através da função createUserWithEmailAndPassword do Firebase.
  const HandleRegisterClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  // Responsável por atualizar o estado da variável email conforme o usuário digita seu endereço de email.
  const handleEmailChange = async (event: React.ChangeEvent<HTMLButtonElement>) =>
    setEmail(event.target.value);

  // Responsável por atualizar o estado da variável password conforme o usuário digita sua senha
  const handlePasswordChange = async (event: React.ChangeEvent<HTMLButtonElement>) =>
    setPassword(event.target.value);

  return (
    <div className='flex__container'>
      <div className='main__container'>
        <Brand />
        <GoogleTag text='Cadastre-se com Google' />
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
