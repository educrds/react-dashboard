import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../services/firebaseConfig';
import { AuthenticateContext } from '../../contexts/AuthenticateContext';
import { Navigate } from 'react-router-dom';
import './styles.scss';

type Props = {
  text: string;
};

const GoogleAuthButton = ({ text }: Props) => {
  const { user, setUser } = useContext(AuthenticateContext);

  // Responsável por autenticar o usuário através da conta do Google usando a função signInWithPopup do Firebase.
  const handleRegisterWithGoogle = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('@Auth:uid', user.uid);
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  return (
    <button className='google-tag' onClick={handleRegisterWithGoogle}>
      <div className='google-icon'>
        <FcGoogle />
      </div>
      <div className='text'>{text}</div>
    </button>
  );
};

export default GoogleAuthButton;
