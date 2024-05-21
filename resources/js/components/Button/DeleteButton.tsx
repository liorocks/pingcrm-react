import { ComponentProps } from 'react';

interface Props extends ComponentProps<'button'> {
  onDelete: () => void;
}

export default function DeleteButton({ onDelete, children }: Props) {
  return (
    <button
      className="text-red-600 focus:outline-none hover:underline"
      type="button"
      tabIndex={-1}
      onClick={onDelete}
    >
      {children}
    </button>
  );
}
