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
import { useRouter } from "next/navigation";



export enum AuthTypes {
  LOGIN = "LOGIN",
  SIGN_UP = "SIGN_UP",
}

type AccountState = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  clientLogin: (data: { accessToken: string; expiresIn: number }) => void;
  switchAuth: (auth: AuthTypes) => void;
  authType: AuthTypes;
};

export const AccountContext = createContext<AccountState>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  clientLogin: () => {},
  switchAuth: () => {},
  authType: AuthTypes.LOGIN,
});

type ContextProps = {
  children: ReactNode;
};
const AccountProvider: FC<ContextProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authType, setAuthType] = useState<AuthTypes>(AuthTypes.LOGIN);

  const router = useRouter();

  const switchAuth = useCallback((auth: AuthTypes) => {
    setAuthType(auth);
  }, []);

  const clientLogin = useCallback(
    (data: { accessToken: string; expiresIn: number }) => {
      localStorage.setItem(
        "loginInfo",
        JSON.stringify({
          ...data,
          expiresAt: new Date(
            new Date().getTime() + data.expiresIn * 1000
          ).getTime(),
        })
      );
      setIsLoggedIn(true);
      router.replace("/farmers/land");
    },
    [router]
  );

  useEffect(() => {
    const loginInfoRaw = localStorage.getItem("loginInfo");

    if (loginInfoRaw) {
      const loginInfo = JSON.parse(loginInfoRaw);
      if (Date.now() >= loginInfo.expiresAt) {
        setIsLoggedIn(false);
        localStorage.removeItem("loginInfo");
      } else {
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <AccountContext.Provider
      value={{ isLoggedIn, switchAuth, setIsLoggedIn, clientLogin, authType }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
