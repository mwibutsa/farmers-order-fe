import { create, StoreApi, UseBoundStore } from "zustand";
import { useCallback, useEffect, useState } from "react";
import { LOGIN_KEY } from "@/context/AccountProvider";
import { getLocalStorageItem } from "@/lib/localStorage";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const useAuthStore: UseBoundStore<
  StoreApi<{
    accessToken: string;
    isLoading: boolean;
    setAuth: (arg: string) => void;
    logout: () => void;
  }>
> = create((set) => ({
  accessToken: "",
  isLoading: true,
  setAuth: (accessToken: string) =>
    set({
      accessToken,
      isLoading: false,
    }),
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOGIN_KEY);
    }
    set({ accessToken: "", isLoading: false });
  },
}));

export function useAuth() {
  const { setAuth, logout, accessToken, isLoading } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const initializeAuth = () => {
      const loginInfo = getLocalStorageItem(LOGIN_KEY);
      if (!loginInfo?.accessToken) {
        setAuth("");
        return;
      }

      // Check if token is expired
      if (!loginInfo?.accessToken) {
        logout();
        return;
      }

      setAuth(loginInfo.accessToken);

      // Set up expiration timeout
      const timeUntilExpiry = parseInt(loginInfo.expiresAt) - Date.now();
      if (timeUntilExpiry > 0) {
        setTimeout(logout, timeUntilExpiry);
      } else {
        logout();
      }
    };

    initializeAuth();
  }, [isMounted, logout, setAuth]);

  const login = useCallback(
    (accessToken: string, expiresIn: number, isAdmin: boolean = false) => {
      const expirationTime = Date.now() + expiresIn * 1000;

      localStorage.setItem(
        LOGIN_KEY,
        JSON.stringify({
          accessToken,
          expiresAt: expirationTime,
          isAdmin,
        })
      );

      setCookie("token", accessToken);
      setCookie("isAdmin", isAdmin);
      setAuth(accessToken);

      // Set up expiration timeout
      setTimeout(logout, expiresIn * 1000);
    },
    [logout, setAuth]
  );
  const router = useRouter();

  const logoutHandler = useCallback(() => {
    logout();
    router.replace("/");
  }, [logout, router]);

  // Only return valid state after mounting
  if (!isMounted) {
    return {
      isLoggedIn: false,
      isLoading: true,
      login,
      logout: logoutHandler,
    };
  }

  return {
    isLoggedIn: !!accessToken,
    isLoading,
    login,
    logout: logoutHandler,
  };
}
