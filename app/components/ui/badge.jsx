import React from "react";

/**
 * Badge component
 *
 * @param {string} [variant='default'] - The variant to use. Options are 'default', 'outline', 'primary', 'danger', and 'success'.
 * @param {string} [className=''] - Additional tailwind classes to apply to the badge.
 * @param {*} children - The content to render inside the badge.
 * @param {function} [onClick] - An optional click handler.
 *
 * @example
 * <Badge variant="primary">Hello World</Badge>
 */
const Badge = ({ variant = "default", className = "", children, onClick }) => {
  const variants = {
    default: "bg-gray-200 text-gray-800",
    outline: "border border-gray-300 text-gray-700 bg-white",
    primary: "bg-blue-500 text-white",
    danger: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
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
