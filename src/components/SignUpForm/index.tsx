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
import { signUpHandler } from "@/lib/farmers";
import { AccountContext, AuthTypes } from "@/context/AccountProvider";
import { ISignUpPayload } from "@/interfaces/payload";
import { logger } from "@/utils/logger";

const SignUpForm: FC = () => {
  const [payload, setPayload] = useState<ISignUpPayload>({
    phoneNumber: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const { switchAuth } = useContext(AccountContext);

  const valueChangeHandler = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const disableSubmit = useMemo(() => {
    return Object.values(payload).some((value: string) => value.trim() === "");
  }, [payload]);

  const submitHandler = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (disableSubmit) return;

      try {
        const result = await signUpHandler(payload);
        if (result) {
          switchAuth(AuthTypes.LOGIN);
        }
      } catch (error) {
        logger(error);
      }
    },
    [disableSubmit, payload, switchAuth]
  );

  return (
    <form onSubmit={submitHandler}>
      <div className="flex gap-1">
        <Input
          value={payload.firstName}
          placeholder="John"
          label="First Name"
          onChange={valueChangeHandler}
          name="firstName"
        />
        <Input
          value={payload.lastName}
          placeholder="Doe"
          label="Last Name"
          onChange={valueChangeHandler}
          name="lastName"
        />
      </div>
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
        <Button type="submit">Sign Up</Button>
        <span className="text-sm text-slate-700">
          Already have an account ?{" "}
          <button
            onClick={() => {
              switchAuth(AuthTypes.LOGIN);
            }}
            className="text-green-700 cursor-pointer hover:border-b hover:border-green-700 hover:font-semibold w-16 h-6 text-left"
          >
            Login
          </button>
        </span>
      </div>
    </form>
  );
};

export default SignUpForm;
