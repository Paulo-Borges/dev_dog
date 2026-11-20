import React from "react";

// @CLAUDE: antes as props eram tipadas só como { children }, então o TS não deixava
// passar onClick, disabled, type etc. Agora o Button aceita todas as props de um <button>.
type ButtonProps = React.ComponentProps<"button">;

const Button = ({ children, ...props }: ButtonProps) => {
  return <button {...props}>{children}</button>;
};

export default Button;
