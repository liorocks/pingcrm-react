import React from 'react';
import { Check, CircleX, TriangleAlert } from 'lucide-react';
import CloseButton from '@/Components/Button/CloseButton';

interface Alert {
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  variant?: 'success' | 'error' | 'warning';
}

export default function Alert({
  icon,
  action,
  message,
  variant,
  onClose
}: Alert) {
  const color = {
    success: 'green',
    error: 'red',
    warning: 'yellow'
  }[variant || 'success'];

  const backGroundColor = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-yellow-800'
  }[variant || 'success'];

  const iconComponent = {
    success: <Check size={20} />,
    error: <CircleX size={20} />,
    warning: <TriangleAlert size={20} />
  }[variant || 'success'];

  return (
    <div
      className={`${backGroundColor} px-4 mb-8 flex items-center justify-between rounded max-w-3xl`}
    >
      <div className="flex items-center space-x-2">
        {icon || iconComponent}
        <div className="py-4 text-sm font-medium">{message}</div>
      </div>
      {action}
      {onClose && <CloseButton onClick={onClose} color={color} />}
    </div>
  );
}
