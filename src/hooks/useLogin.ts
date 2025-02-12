import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { LOGIN_KEY } from "@/context/AccountProvider";
import { useAuth } from "./useAuth";

interface LoginData {
  accessToken: string;
  expiresIn: number;
  isAdmin?: boolean;
}

const useLogin = (redirectPath: string) => {
  const router = useRouter();
  const { login } = useAuth();

  return useCallback(
    (data: LoginData) => {
      localStorage.setItem(
        LOGIN_KEY,
        JSON.stringify({
          ...data,
          expiresAt: new Date(
            new Date().getTime() + data.expiresIn * 1000
          ).getTime(),
        })
      );
      login(data.accessToken, data.expiresIn, data.isAdmin);
      router.replace(redirectPath);
    },
    [router, redirectPath, login]
  );
};

export const useLoginFunctions = () => {
  const clientLogin = useLogin("/farmers/land");
  const adminLogin = useLogin("/admin/orders");

  return { clientLogin, adminLogin };
};
