import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { LOGIN_KEY } from "@/context/AccountProvider";

interface LoginData {
  accessToken: string;
  expiresIn: number;
  isAdmin?: boolean;
}

const useLogin = (redirectPath: string) => {
  const router = useRouter();

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
      router.replace(redirectPath);
    },
    [router, redirectPath]
  );
};

export const useLoginFunctions = () => {
  const clientLogin = useLogin("/farmers/land");
  const adminLogin = useLogin("/admin/orders");

  return { clientLogin, adminLogin };
};
