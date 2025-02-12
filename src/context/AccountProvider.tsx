"use client";

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";


export enum AuthTypes {
  LOGIN = "LOGIN",
  SIGN_UP = "SIGN_UP",
}

export const LOGIN_KEY = "loginInfo";

type AccountState = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  switchAuth: (auth: AuthTypes) => void;
  authType: AuthTypes;
};

export const AccountContext = createContext<AccountState>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  switchAuth: () => {},
  authType: AuthTypes.LOGIN,
});

type ContextProps = {
  children: ReactNode;
};

const AccountProvider: FC<ContextProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authType, setAuthType] = useState<AuthTypes>(AuthTypes.LOGIN);

  const switchAuth = useCallback((auth: AuthTypes) => {
    setAuthType(auth);
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      switchAuth,
      setIsLoggedIn,
      authType,
    }),
    [isLoggedIn, switchAuth, setIsLoggedIn, authType]
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export default AccountProvider;
