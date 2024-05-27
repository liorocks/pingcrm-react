import { ComponentProps } from 'react';
import classNames from 'classnames';
import { X } from 'lucide-react';

interface CloseButtonProps extends ComponentProps<'button'> {
  color: string | 'red' | 'green';
}

export default function CloseButton({ color, onClick }: CloseButtonProps) {
  const className = classNames('block -mr-2 fill-current', {
    'text-red-700 group-hover:text-red-800': color === 'red',
    'text-green-700 group-hover:text-green-800': color === 'green'
  });
  return (
    <button
      onClick={onClick}
      type="button"
      className="focus:outline-none group p-2"
    >
      <X size={16} className={className} />
    </button>
  );
}
