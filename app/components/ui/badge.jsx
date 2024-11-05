import React from 'react';

const Badge = ({ variant = 'default', className = '', children, onClick }) => {
  const variants = {
    default: 'bg-gray-200 text-gray-800',
    outline: 'border border-gray-300 text-gray-700 bg-white',
    primary: 'bg-blue-500 text-white',
    danger: 'bg-red-500 text-white',
    success: 'bg-green-500 text-white',
  };

  const badgeClasses = `${variants[variant]} inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`;

  return (
    <span className={badgeClasses} onClick={onClick}>
      {children}
    </span>
  );
};

export default Badge; // Make sure you are using `export default`
