import { createContext, useState, useContext } from "react";

export const OpenSidebarContext = createContext(); // Changed the export name

export const OpenSidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <OpenSidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </OpenSidebarContext.Provider>
  );
};

// CREATE HOOK FOR RETURN OpenSidebarContext
export function useOpenSidebar() { // Changed the export name
  return useContext(OpenSidebarContext);
}
