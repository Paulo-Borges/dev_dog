import React from "react";
import UserHeaderNav from "./UserHeaderNav";
import { useLocation } from "react-router-dom";

const UserHeader: React.FC = () => {
  const { pathname } = useLocation();

  const titles: Record<string, string> = {
    "/conta/estatisticas": "Estatísticas",
    "/conta/postar": "Adicionar Fotos",
  };

  const title = titles[pathname] || "Minhas Fotos";

  return (
    <header className="flex items-center gap-4">
      <h1>{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
