import React from 'react';

export default ({ loading, className, children, ...props }) => {
  return (
    <button
      disabled={loading}
      className={`focus:outline-none flex items-center ${className}`}
      {...props}
    >
      {loading && <div className="btn-spinner mr-2" />}
      {children}
    </button>
  );
};
