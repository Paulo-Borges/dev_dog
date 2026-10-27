import React from "react";

const Button = ({ children, ...props }: { children: React.ReactNode }) => {
  return <button {...props}>{children}</button>;
};

export default Button;
