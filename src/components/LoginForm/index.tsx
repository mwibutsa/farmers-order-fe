"use client";

import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Input from "../Input";
import Button from "../Button";
import { loginHandler } from "@/lib/farmers";
import { AccountContext, AuthTypes } from "@/context/AccountProvider";
import { CustomError, useApiCall } from "@/hooks/useApiCall";
import { ILoginResponse } from "@/interfaces/responses";
import { ILoginPayload } from "@/interfaces/payload";
import { useLoginFunctions } from "@/hooks/useLogin";
import { usePathname } from "next/navigation";

const LoginForm: FC = () => {
  const { execute, isLoading, data, error } = useApiCall<
    ILoginResponse,
    ILoginPayload
  >();
  const [payload, setPayload] = useState<ILoginPayload>({
    phoneNumber: "",
    password: "",
  });

  const { switchAuth } = useContext(AccountContext);
  const { clientLogin, adminLogin } = useLoginFunctions();

  const valueChangeHandler = useCallback(
    ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
      setPayload((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const disableSubmit = useMemo(() => {
    return payload.password.trim() === "" || payload.phoneNumber.trim() === "";
  }, [payload.password, payload.phoneNumber]);

  const pathname = usePathname();

  const isAdmin = useMemo(() => {
    return pathname.includes("admin");
  }, [pathname]);

  useEffect(() => {
    if (data?.data) {
      const { data: loginData } = data;
      const callback = loginData?.isAdmin ? adminLogin : clientLogin;
      callback(loginData);
    }
  }, [data, adminLogin, clientLogin]);

  const accountLoginHandler = useCallback(async () => {
    if (disableSubmit) return;
    await execute(() => loginHandler(payload, isAdmin));
  }, [disableSubmit, payload, , execute, isAdmin]);

  const handleSignUpClick = useCallback(() => {
    switchAuth(AuthTypes.SIGN_UP);
  }, [switchAuth]);

  const customError = error as CustomError;

  return (
    <form
      method="POST"
      className="w-full min-w-64"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        value={payload.phoneNumber}
        placeholder={isAdmin ? "Email" : "Phone number"}
        label={isAdmin ? "Email" : "Phone number"}
        onChange={valueChangeHandler}
        name="phoneNumber"
      />
      <Input
        value={payload.password}
        placeholder="Password"
        type="password"
        label="Password"
        onChange={valueChangeHandler}
        name="password"
      />

      <div className="h-12">
        {customError?.message ? (
          <div className="bg my-2 rounded-md text-red-700  p-2 bg-red-200">
            {error?.message}
          </div>
        ) : null}

        {customError?.error && !customError?.message ? (
          <div className="bg my-2 rounded-md  p-2 bg-red-200 text-red-700">
            {customError.error["phoneNumber"]}
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="submit"
          className={`${
            isLoading || disableSubmit ? "pointer-events-none bg-green-200" : ""
          }`}
          onClick={accountLoginHandler}
        >
          Login
        </Button>

        {!isAdmin && (
          <span className="text-sm text-slate-700">
            No account yet?{" "}
            <button
              onClick={handleSignUpClick}
              className="text-green-700 cursor-pointer hover:border-b hover:border-green-700 hover:font-semibold w-16 h-6 text-left"
            >
              Sign Up
            </button>
          </span>
        )}
      </div>
    </form>
  );
};

export default memo(LoginForm);
