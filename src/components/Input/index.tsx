import { ChangeEventHandler, FC } from "react";

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
  ...props
}) => {
  return (
    <div className="mb-5 flex-1">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        value={value}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
        placeholder={placeholder}
        {...props}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
