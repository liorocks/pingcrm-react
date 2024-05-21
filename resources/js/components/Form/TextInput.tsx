import { ComponentProps } from 'react';

interface TextInputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
}

export default function TextInput({
  label,
  name,
  className,
  error,
  ...props
}: TextInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-gray-800 select-none" htmlFor={name}>
          {label}:
        </label>
      )}
      <input
        id={name}
        name={name}
        {...props}
        className={`form-input w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded ${
          error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
        }`}
      />
      {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
    </div>
  );
}
