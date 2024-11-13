"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

// Admin test
const admin = { email: "testpwa@exemple.com", password: "Yj$aHcI7%hXF2RiT" };

type AuthContextDataType = {
  authenticatedUser: { email: string; password: string } | null;
  login?: (email: string, password: string) => void;
  logout?: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

const initialAuthContextData: AuthContextDataType = {
  authenticatedUser: null,
};

export const AuthContext = createContext(initialAuthContextData);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthContextDataType>({
      authenticatedUser: null,
    });
  const [isLoading, setIsLoading] = useState(true);

  const login = (email: string, password: string) => {
    if (
      window != undefined &&
      window.localStorage.getItem("authenticatedUser")
    ) {
      if (email === admin.email && password === admin.password) {
        window.localStorage.setItem("authenticatedUser", JSON.stringify(admin));

        setAuthenticatedUser({
          authenticatedUser: admin,
        });
      }
    }
  };

  const logout = () => {
    if (window != undefined) {
      window.localStorage.setItem("authenticatedUser", JSON.stringify(null));

      setAuthenticatedUser({
        authenticatedUser: null,
      });
    }
  };

  useEffect(() => {
    if (window != undefined) {
      console.log("Window is here");

      const auth = {
        ...JSON.parse(window.localStorage.getItem("authenticatedUser")!),
      } as { email: string; password: string } | null;

      if (auth && Object.keys(auth).length === 0) {
        setAuthenticatedUser({ authenticatedUser: null });
        setIsLoading(false);
      } else {
        setAuthenticatedUser({ authenticatedUser: auth });
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  console.log("authenticatedUser :", authenticatedUser);

  if (isLoading) return null;

  return (
    <>
      <AuthContext.Provider value={{ ...authenticatedUser, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
