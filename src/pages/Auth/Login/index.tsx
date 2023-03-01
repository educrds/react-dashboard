import React, { useState } from 'react';
import AuthButton from '../../../components/AuthButton';
import Brand from '../../../components/Brand';
import GoogleTag from '../../../components/GoogleTag';
import PasswordInput from '../../../components/Inputs/PasswordInput';
import '../styles.scss';
import illustration from '../../../assets/imgs/money-rafiki.png';
import Input from '../../../components/Inputs/Input';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth, provider } from '../../../services/firebaseConfig';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sendEmailPasswordReset, setSendEmailPasswordReset] = useState(false);

  // Responsável por logar uma conta de usuário com email e senha através da função signInWithEmailAndPassword do Firebase.
  const HandleLoginClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  // Responsável por atualizar o estado da variável email conforme o usuário digita seu endereço de email.
  const handleEmailChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setEmail(event.target.value);

  // Responsável por atualizar o estado da variável password conforme o usuário digita sua senha

  const handlePasswordChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setPassword(event.target.value);

  // Responsável por autenticar o usuário através da conta do Google usando a função signInWithPopup do Firebase.

  const handleLoginWithGoogle = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const handlePasswordReset = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSendEmailPasswordReset(true);
      setTimeout(() => {
        setSendEmailPasswordReset(false);
      }, 2500);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  return (
    <div className='flex__container'>
      <div className='main__container'>
        <Brand />
        <GoogleTag text='Entrar com Google' onClick={handleLoginWithGoogle} />
        <Line />
        {sendEmailPasswordReset && <AlertMessage />}
        <Input
          type='email'
          placeholder='Email'
          name='email'
          label='Email'
          onChange={handleEmailChange}
          value={email}
        />
        <PasswordInput onChange={handlePasswordChange} value={password} />
        <ForgetPassword onClick={handlePasswordReset} />
        <AuthButton text='Entrar' onClick={HandleLoginClick} />
        <CreateAccount />
      </div>
      <Illustration />
    </div>
  );
};

const AlertMessage = () => {
  return (
    <div className='alert__message'>
      <MdOutlineMarkEmailRead />
      Email para redefinir senha enviado.
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

const ForgetPassword = ({ onClick }) => {
  return (
    <div className='forget__password' onClick={onClick}>
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
