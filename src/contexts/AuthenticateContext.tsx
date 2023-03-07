import { createContext } from 'react';
interface AuthenticateContextProps {
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthenticateContext = createContext<AuthenticateContextProps>({
  user: false,
  setUser: user => {},
});
