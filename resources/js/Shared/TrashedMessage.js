import React from 'react';
import Icon from '@/Shared/Icon';

export default ({ onRestore, children }) => {
  return (
    <div className="max-w-3xl mb-6 p-4 bg-yellow-400 rounded border border-yellow-500 flex items-center justify-between">
      <div className="flex items-center">
        <Icon
          name="trash"
          className="flex-shrink-0 w-4 h-4 fill-current text-yellow-800 mr-2"
        />
        <div className="text-yellow-800">{children}</div>
      </div>
      <button
        className="text-yellow-800 focus:outline-none text-sm hover:underline"
        tabIndex="-1"
        type="button"
        onClick={onRestore}
      >
        Restore
      </button>
    </div>
  );
};
