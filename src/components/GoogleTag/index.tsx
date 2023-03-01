import React from 'react';
import './styles.scss';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../services/firebaseConfig';

type Props = {
  text: string;
};

// Responsável por autenticar o usuário através da conta do Google usando a função signInWithPopup do Firebase.
const handleRegisterWithGoogle = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  event.preventDefault();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
};

const GoogleTag = ({ text }: Props) => (
  <button className='google-tag' onClick={handleRegisterWithGoogle}>
    <div className='google-icon'>
      <FcGoogle />
    </div>
    <div className='text'>{text}</div>
  </button>
);

export default GoogleTag;
