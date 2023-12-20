import { createContext, useContext, useState } from "react";

export const UsersContext = createContext();

export const UsersContextFunc = ({ children }) => {
  const [users_list, set_users_list] = useState([]);
  return (
    <UsersContext.Provider value={{ users_list, set_users_list }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersList() {
    return useContext(UsersContext)
}
