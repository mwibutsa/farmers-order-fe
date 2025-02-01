"use client";

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { getLocalStorageItem } from "@/lib/localStorage";

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
  const [firstLogin, setFirstLogin] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const redirectInProgress = useRef(false);

  const logoutHandler = useCallback(() => {
    localStorage.removeItem(LOGIN_KEY);
    setIsLoggedIn(false);
    window.location.reload();
    window.location.replace("/");
  }, []);

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
      setIsLoggedIn(true);
      setFirstLogin(true);
      window.location.reload();
    },
    []
  );

  // Initialize authentication state
  useEffect(() => {
    const loginInfo = getLocalStorageItem(LOGIN_KEY);
    if (loginInfo) {
      if (Date.now() >= loginInfo.expiresAt) {
        setIsLoggedIn(false);
        localStorage.removeItem(LOGIN_KEY);
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
    setIsInitialized(true);
  }, []);

  // Handle redirects
  useEffect(() => {
    if (!isInitialized || redirectInProgress.current) {
      return;
    }

    const handleRedirect = async () => {
      redirectInProgress.current = true;

      if (!isLoggedIn && pathname !== "/") {
        router.replace("/");
      } else if (isLoggedIn && pathname === "/") {
        if (firstLogin) {
          router.replace("/farmers/land");
          setFirstLogin(false);
        } else {
          router.replace(pathname);
        }
      }

      redirectInProgress.current = false;
    };

    handleRedirect();
  }, [isLoggedIn, pathname, router, firstLogin, isInitialized]);

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
      {isInitialized ? children : null}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
