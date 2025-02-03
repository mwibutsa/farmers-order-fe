"use client";

import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Input from "../Input";
import Button from "../Button";
import { loginHandler } from "@/lib/farmers";
import { AccountContext, AuthTypes } from "@/context/AccountProvider";
import { useApiCall } from "@/hooks/useApiCall";
import { ILoginResponse } from "@/interfaces/responses";
import { ILoginPayload } from "@/interfaces/payload";

const LoginForm: FC = () => {
  const { execute, isLoading, data } = useApiCall<
    ILoginResponse,
    ILoginPayload
  >();
  const [payload, setPayload] = useState<ILoginPayload>({
    phoneNumber: "",
    password: "",
  });

  const { clientLogin, switchAuth } = useContext(AccountContext);

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

  const submitHandler = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (disableSubmit) return;
      const { success } = await execute(() => loginHandler(payload));

      if (success && data) {
        clientLogin(data.data);
      }
    },
    [disableSubmit, payload, clientLogin, execute, data]
  );

  const handleSignUpClick = useCallback(() => {
    switchAuth(AuthTypes.SIGN_UP);
  }, [switchAuth]);

  return (
    <form method="POST" onSubmit={submitHandler}>
      <Input
        value={payload.phoneNumber}
        placeholder="Phone number"
        label="Phone number"
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
      <div className="flex items-center gap-2">
        <Button
          type="submit"
          className={`${isLoading ? "pointer-events-none bg-green-200" : ""}`}
        >
          Login
        </Button>
        <span className="text-sm text-slate-700">
          Not account yet?{" "}
          <button
            onClick={handleSignUpClick}
            className="text-green-700 cursor-pointer hover:border-b hover:border-green-700 hover:font-semibold w-16 h-6 text-left"
          >
            Sign Up
          </button>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
