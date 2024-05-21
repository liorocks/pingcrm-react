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
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <select
        id={name}
        name={name}
        {...props}
        className={`form-select ${error ? 'error' : ''}`}
      >
        {options?.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}
