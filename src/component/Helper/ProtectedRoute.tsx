import React from "react";
import { UserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const context = React.useContext(UserContext);

  if (!context) return null;
  const { login } = context;

  if (login === null) return null; // ainda verificando o token
  return login ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const context = React.useContext(UserContext);
//   if (!context) return null;
//   const { user } = context;
//   if (!user) return null;
//   return <>{children}</>;
// };

// export default ProtectedRoute;
