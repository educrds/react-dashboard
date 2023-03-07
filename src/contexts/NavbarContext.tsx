import React, { createContext, useState, FC } from 'react';

interface INavbarContext {
  handleCollapseToggle: () => void;
  isCollapsed: boolean;
}

export const NavbarContext = createContext<INavbarContext>({
  handleCollapseToggle: () => {},
  isCollapsed: false,
});

interface NavbarContextProviderProps {
  children: React.ReactNode;
}

export const NavbarContextProvider: FC<NavbarContextProviderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const handleCollapseToggle = () => setCollapsed(!collapsed);

  return (
    <NavbarContext.Provider
      value={{
        handleCollapseToggle,
        isCollapsed: !!collapsed,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
