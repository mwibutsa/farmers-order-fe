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
import { ILoginPayload, loginHandler } from "@/lib/farmers";
import { AccountContext } from "@/context/AccountProvider";

const LoginForm: FC = () => {
  const [payload, setPayload] = useState<ILoginPayload>({
    phoneNumber: "",
    password: "",
  });

  const { clientLogin } = useContext(AccountContext);

  const valueChangeHandler = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const disableSubmit = useMemo(() => {
    return payload.password.trim() === "" || payload.phoneNumber.trim() === "";
  }, [payload.password, payload.phoneNumber]);

  const submitHandler = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (disableSubmit) return;

      try {
        const result = await loginHandler(payload);
        clientLogin(result);
      } catch (error) {
        console.log(error);
      }
    },
    [disableSubmit, payload, clientLogin]
  );

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
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
