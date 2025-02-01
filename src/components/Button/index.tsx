import { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "submit" | "reset" | "button";
};
const Button: FC<ButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      {children}
    </button>
  );
};

export default Button;
