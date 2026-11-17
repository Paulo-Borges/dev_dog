import React from "react";

// @CLAUDE: criei o tipo User com o formato que a API /user retorna.
// Antes "data" e "usuario" eram "string | null", e por isso "data.nome" dava erro no Header.
export interface User {
  id: number;
  username: string;
  nome: string;
  email: string;
}

export interface UserContextType {
  usuario: User | null; // @CLAUDE: era string | null
  data: User | null; // @CLAUDE: era string | null
  userLogin: (username: string, password: string) => Promise<void>;
  userLogout: () => void;
  login: boolean | null; // null = verificando token
  loading: boolean;
  error: string | null;
}

export const UserContext = React.createContext<UserContextType | null>(null);
