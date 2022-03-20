import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React, { createContext, useState } from 'react';
import { SidebarType } from './type';

const SidebarContext = createContext<SidebarType>({
  showSidebar: true,
  setShowSidebar: () => {},
});

const ContextProvider = ({ children }: any) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { ContextProvider, SidebarContext };
