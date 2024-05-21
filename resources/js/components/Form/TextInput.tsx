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
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <input
        id={name}
        name={name}
        {...props}
        className={`form-input ${error ? 'error' : ''}`}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}
