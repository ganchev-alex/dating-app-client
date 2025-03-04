import { createContext, ReactNode, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface IAuthentication {
  token: string | null;
  accessTokenFromStorage: () => Promise<void>;
  setFetchedToken: (token: string) => Promise<void>;
  getToken: () => string | null;
}

export const AuthenticationContext = createContext<IAuthentication>({
  token: null,
  accessTokenFromStorage: async () => {},
  setFetchedToken: async () => {},
  getToken: () => null,
});

const AuthenticationContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  const accessTokenFromStorage = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  const setFetchedToken = async (fetchedToken: string) => {
    try {
      await SecureStore.setItemAsync("token", fetchedToken);
      setToken(fetchedToken);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const getToken = function () {
    return token;
  };

  return (
    <AuthenticationContext.Provider
      value={{ token, accessTokenFromStorage, setFetchedToken, getToken }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
