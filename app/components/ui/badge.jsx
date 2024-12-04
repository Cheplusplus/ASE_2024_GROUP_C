import React from 'react';

const Badge = ({ count, className = '', variant = 'default'}) => {
  if (count <= 0) return null;

  const variants = {
    default: 'bg-green-600 text-white',
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
  };

  return (
    <span 
      className={`absolute -top-2 -right-1 text-xs rounded-full px-1.5 py-0.5 
        ${variants[variant] || variants.default} 
        ${className}`}
    >
      {count}
    </span>
  );
};

export default Badge; // Make sure you are using `export default`
