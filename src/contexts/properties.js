import { createContext, useContext, useState } from "react";
import Cookies from "universal-cookie";

export const PropertiesContext = createContext();

export const PropertiesProvider = ({ children }) => {
  const cookie = new Cookies();
  const [properties, setProperties] = useState([]);

  const removeProperty = (propertyId) => {
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== propertyId)
    );
  };

  const toggleFavorite = (propertyId, action) => {
    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              favorite_users:
                action === "add"
                  ? [...property.favorite_users, cookie.get("id")]
                  : property.favorite_users.filter(
                      (userId) => userId !== cookie.get("id")
                    ),
            }
          : property
      )
    );
  };

  const toggleAvaliable = (propertyId) => {
    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              is_alive: !property.is_alive,
            }
          : property
      )
    );
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        setProperties,
        removeProperty,
        toggleFavorite,
        toggleAvaliable,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export function useProperties() {
  return useContext(PropertiesContext);
}
