// scroll-area.jsx
import React from "react";

const ScrollArea = ({ children, className = "" }) => (
  <div className={`overflow-y-auto ${className}`}>{children}</div>
);

export default ScrollArea;
