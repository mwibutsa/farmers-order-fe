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

type AccountState = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  clientLogin: (data: { accessToken: string; expiresIn: number }) => void;
};

export const AccountContext = createContext<AccountState>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  clientLogin: () => {},
});

type ContextProps = {
  children: ReactNode;
};
const AccountProvider: FC<ContextProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

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
      router.replace("/farmers-dashboard");
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
    <AccountContext.Provider value={{ isLoggedIn, setIsLoggedIn, clientLogin }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
