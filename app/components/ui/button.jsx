// components/ui/button.jsx
import * as React from "react";
import { useVoiceAssistant } from "../SessionProvider"; // Import the context

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const { isPaused, togglePause } = useVoiceAssistant(); // Access context state

    const baseStyles =
      "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-gray-900 text-gray-50 hover:bg-gray-900/90",
      destructive: "bg-red-500 text-gray-50 hover:bg-red-500/90",
      outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      link: "text-gray-900 underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    const variantStyles = variants[variant] || variants.default;
    const sizeStyles = sizes[size] || sizes.default;

    return (
      <button
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        ref={ref}
        onClick={togglePause} // Toggle the pause state
        {...props}
      >
        {isPaused ? "Resume" : "Pause"} {/* Toggle text based on state */}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
