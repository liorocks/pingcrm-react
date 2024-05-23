import { ComponentProps } from 'react';

interface TextInputProps extends ComponentProps<'input'> {
  error?: string;
}

export default function TextInput({
  name,
  className,
  error,
  ...props
}: TextInputProps) {
  return (
    <input
      id={name}
      name={name}
      {...props}
      className={`form-input w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded ${
        error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
      } ${className}`}
    />
  );
}
