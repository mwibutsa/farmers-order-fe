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
import { useRouter } from "next/navigation";
import useAuthRedirect from "@/hooks/useAuthRedirect";

export enum AuthTypes {
  LOGIN = "LOGIN",
  SIGN_UP = "SIGN_UP",
}

export const LOGIN_KEY = "loginInfo";

type AccountState = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  switchAuth: (auth: AuthTypes) => void;
  logoutHandler: () => void;
  authType: AuthTypes;
};

export const AccountContext = createContext<AccountState>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
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

  const logoutHandler = useCallback(() => {
    localStorage.removeItem(LOGIN_KEY);
    setIsLoggedIn(false);
    router.replace("/");
  }, [router]);

  const switchAuth = useCallback((auth: AuthTypes) => {
    setAuthType(auth);
  }, []);

  // Handle redirects
  useAuthRedirect();

  const value = useMemo(
    () => ({
      isLoggedIn,
      switchAuth,
      setIsLoggedIn,
      authType,
      logoutHandler,
    }),
    [isLoggedIn, switchAuth, setIsLoggedIn, authType, logoutHandler]
  );

  return useMemo(
    () => (
      <AccountContext.Provider value={value}>
        {children}
      </AccountContext.Provider>
    ),
    [value, children]
  );
};

export default AccountProvider;
