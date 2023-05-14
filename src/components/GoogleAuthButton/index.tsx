import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../services/firebaseConfig';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../services/auth/actions';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/firebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import './styles.scss';

type Props = {
  text: string;
};

const GoogleAuthButton = ({ text }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // sign in/up with google
  const handleRegisterWithGoogle = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(result);

      const userInfosQuery = collection(db, `transactions/${user.uid}/user_infos`);
      const userInfos = await getDocs(userInfosQuery);
      if (!userInfos.empty) {
        console.log('user_infos collection already exists');
      } else {
        await addDoc(userInfosQuery, user.reloadUserInfo);
      }

      // insert user id in localStorage
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
