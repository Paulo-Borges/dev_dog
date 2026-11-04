import React from "react";

export interface UserContextType {
  usuario: string | null;
  data: string | null;
  userLogin: (username: string, password: string) => Promise<void>;
  userLogout: () => void;
  login: boolean;
  loading: boolean;
  error: string | null;
}

export const UserContext = React.createContext<UserContextType | null>(null);
