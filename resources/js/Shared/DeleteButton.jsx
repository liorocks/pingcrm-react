import React from 'react';

export default ({ onDelete, children }) => (
  <button
    className="text-red-600 focus:outline-none hover:underline"
    tabIndex="-1"
    type="button"
    onClick={onDelete}
  >
    {children}
  </button>
);
