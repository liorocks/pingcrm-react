import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import classNames from 'classnames';
import { PageProps } from '@/types';
import { Check, CircleX, X } from 'lucide-react';

const ButtonClose = ({ color, onClick }) => {
  const className = classNames('block fill-current', {
    'text-red-700 group-hover:text-red-800': color === 'red',
    'text-green-700 group-hover:text-green-800': color === 'green'
  });
  return (
    <button
      onClick={onClick}
      type="button"
      className="focus:outline-none group mr-2 p-2"
    >
      <X size={16} className={className} />
    </button>
  );
};

export default function FlashedMessages() {
  const [visible, setVisible] = useState(true);
  const { flash, errors } = usePage<PageProps>().props;
  const numOfErrors = Object.keys(errors).length;

  useEffect(() => {
    setVisible(true);
  }, [flash, errors]);

  return (
    <div>
      {flash.success && visible && (
        <div className="mb-8 flex items-center justify-between bg-green-500 rounded max-w-3xl">
          <div className="flex items-center">
            <Check color="white" size={20} className="ml-4 mr-2" />
            <div className="py-4 text-white text-sm font-medium">
              {flash.success}
            </div>
          </div>
          <ButtonClose onClick={() => setVisible(false)} color="green" />
        </div>
      )}
      {(flash.error || numOfErrors > 0) && visible && (
        <div className="mb-8 flex items-center justify-between bg-red-500 rounded max-w-3xl">
          <div className="flex items-center">
            <CircleX color="white" size={20} className="ml-4 mr-2" />
            <div className="py-4 text-white text-sm font-medium">
              {flash.error && flash.error}
              {numOfErrors === 1 && 'There is one form error'}
              {numOfErrors > 1 && `There are ${numOfErrors} form errors.`}
            </div>
          </div>
          <ButtonClose onClick={() => setVisible(false)} color="red" />
        </div>
      )}
    </div>
  );
}
