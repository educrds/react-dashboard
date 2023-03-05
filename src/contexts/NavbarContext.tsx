import { createContext } from 'react';
interface INavbarContext {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarContext = createContext<INavbarContext>({
  collapsed: false,
  setCollapsed: collapsed => {},
});
