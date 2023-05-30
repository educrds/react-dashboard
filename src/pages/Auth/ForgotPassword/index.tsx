import React, { useState } from 'react';
import AuthButton from '../../../components/AuthButton';
import Brand from '../../../components/Brand';
import illustration from '../../../assets/imgs/illustration.png';
import Input from '../../../components/Inputs/Input';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { MdOutlineMarkEmailRead, MdOutlineErrorOutline } from 'react-icons/md';
import '../styles.scss';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');

  // Responsável por logar uma conta de usuário com email e senha através da função signInWithEmailAndPassword do Firebase.
  const HandleButtonClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (!email) {
      return setAlert('error');
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setAlert('alert');
      setTimeout(() => {
        setAlert('');
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.log(error.code, error.message);
    }
  };
  // Responsável por atualizar o estado da variável email conforme o usuário digita seu endereço de email.
  const handleEmailChange = (event: React.MouseEvent<HTMLButtonElement>) =>
    setEmail(event.target.value);

  return (
    <div className='flex__container'>
      <div className='main__container'>
        <Brand />
        <Info />
        {alert && <AlertMessage type={alert} />}
        <Input
          type='email'
          placeholder='Email'
          name='email'
          label='Email'
          onChange={handleEmailChange}
          value={email}
        />
        <AuthButton text='Enviar' onClick={HandleButtonClick} />
      </div>
      <Illustration />
    </div>
  );
};

const AlertMessage = ({ type }) => {
  return (
    <div className={type === 'error' ? 'error__message' : 'alert__message'}>
      {type === 'error' ? <MdOutlineErrorOutline /> : <MdOutlineMarkEmailRead />}
      {type === 'error' ? 'Insira um email válido!' : 'Email para redefinir senha enviado.'}
    </div>
  );
};

const Info = () => {
  return (
    <div className='reset__info__alert'>
      <p>Insira seu email cadastrado para enviarmos o link de recuperação de senha.</p>
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

export default ForgotPassword;
