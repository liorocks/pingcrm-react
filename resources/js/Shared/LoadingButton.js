import React from 'react';

export default ({ loading, className, children, ...props }) => {
  return (
    <button
      disabled={loading}
      className={`focus:outline-none flex items-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      {...props}
    >
      {loading && <div className="btn-spinner mr-2" />}
      {children}
    </button>
  );
};
