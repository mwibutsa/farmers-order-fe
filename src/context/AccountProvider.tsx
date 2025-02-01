"use client";

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/localStorage";

export enum AuthTypes {
  LOGIN = "LOGIN",
  SIGN_UP = "SIGN_UP",
}

export const LOGIN_KEY = "loginInfo";

type AccountState = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  clientLogin: (data: { accessToken: string; expiresIn: number }) => void;
  switchAuth: (auth: AuthTypes) => void;
  logoutHandler: () => void;
  authType: AuthTypes;
};

export const AccountContext = createContext<AccountState>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  clientLogin: () => {},
  switchAuth: () => {},
  logoutHandler: () => {},
  authType: AuthTypes.LOGIN,
});

type ContextProps = {
  children: ReactNode;
};

const AccountProvider: FC<ContextProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authType, setAuthType] = useState<AuthTypes>(AuthTypes.LOGIN);

  const router = useRouter();
  const pathname = usePathname();

  const logoutHandler = useCallback(() => {
    localStorage.removeItem(LOGIN_KEY);
    setIsLoggedIn(false);
    router.replace("/");
  }, [router]);

  const switchAuth = useCallback((auth: AuthTypes) => {
    setAuthType(auth);
  }, []);

  const clientLogin = useCallback(
    (data: { accessToken: string; expiresIn: number }) => {
      localStorage.setItem(
        LOGIN_KEY,
        JSON.stringify({
          ...data,
          expiresAt: new Date(
            new Date().getTime() + data.expiresIn * 1000
          ).getTime(),
        })
      );
      router.replace("/farmers/land");
    },
    [router]
  );

  // Initialize authentication state

  // Handle redirects
  useEffect(() => {
    if (isAuthenticated() && pathname === "/") {
      router.replace("/farmers/land");
    } else if (!isAuthenticated() && pathname !== "/") {
      router.replace("/");
    }
  }, [pathname, router]);

  return (
    <AccountContext.Provider
      value={{
        isLoggedIn,
        switchAuth,
        setIsLoggedIn,
        clientLogin,
        authType,
        logoutHandler,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
