import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../services/firebaseConfig';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../services/auth/actions';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

type Props = {
  text: string;
};

const GoogleAuthButton = ({ text }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Responsável por autenticar o usuário através da conta do Google usando a função signInWithPopup do Firebase.
  const handleRegisterWithGoogle = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('@Auth:uid', user.uid);
      dispatch(setUserId(user.uid));
      navigate('/dashboard');
    } catch (error) {
      console.log(error.message);
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
