import { ChangeEvent, FC } from "react";

type SelectInputProps = {
  name: string;
  value?: string | number;
  options: { id: number; name: string }[];
  label: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
};

const SelectInput: FC<SelectInputProps> = ({
  name,
  value,
  options,
  label,
  disabled,
  onChange,
}) => {
  return (
    <div className={`pb-2.5 ${disabled ? "opacity-95" : ""}`}>
      <label
        htmlFor={name}
        className="block mb-1 font-semibold text-sm text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        disabled={disabled}
        id={name}
        value={value}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed"
        onChange={onChange}
      >
        <option value="">Select a {label}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
