import { createContext, useContext, useState } from "react";

export const UsersContext = createContext();

export const UsersContextFunc = ({ children }) => {
  const [users_list, set_users_list] = useState([]);

  const removeUser = (userId) => {
    set_users_list((prevUser) => prevUser.filter((user) => user.id !== userId));
  };
  return (
    <UsersContext.Provider value={{ users_list, set_users_list , removeUser }}>
      {children}
    </UsersContext.Provider>
  );
};

export function useUsersList() {
  return useContext(UsersContext);
}
