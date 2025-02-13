import { ChangeEventHandler, FC } from "react";
import React from "react";

type InputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  value?: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name?: string;
};

const Input: FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  name = "",
  ...props
}) => {
  const inputId = `input-${name || label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="mb-5 flex-1">
      <label
        htmlFor={inputId}
        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={inputId}
        value={value}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
        placeholder={placeholder}
        name={name}
        {...props}
        onChange={onChange}
      />
    </div>
  );
};

export default React.memo(Input);
