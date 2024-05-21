import { ComponentProps } from 'react';

interface SelectInputProps extends ComponentProps<'select'> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export default function SelectInput({
  name,
  label,
  className,
  error,
  options = [],
  ...props
}: SelectInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className=" block text-gray-800 select-none" htmlFor={name}>
          {label}:
        </label>
      )}
      <select
        id={name}
        name={name}
        {...props}
        className={`form-select w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded ${
          error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
        }`}
      >
        {options?.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
    </div>
  );
}
