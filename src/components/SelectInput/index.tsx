import { ChangeEvent, FC } from "react";

type SelectInputProps = {
  name: string;
  value?: string | number;
  options: { id: number; name: string; selected?: boolean }[];
  label: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};
const SelectInput: FC<SelectInputProps> = ({
  name,
  value,
  options,
  label,
  onChange,
}) => {
  return (
    <div className="pb-2.5">
      <label
        htmlFor={name}
        className="block mb-1 font-semibold text-sm  text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={name}
        value={value}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
      >
        <option value="">Select a {label}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id} selected={option.selected}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
