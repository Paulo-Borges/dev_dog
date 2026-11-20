import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext";
import minhasFotos from "../../Assets/page-edit.svg";
import estatisticas from "../../Assets/repeat.svg";
import adicionarFotos from "../../Assets/check.svg";
import sair from "../../Assets/stat-down.svg";

const UserHeaderNav: React.FC = () => {
  const [mobile, setMobile] = React.useState(null);
  const { userLogout } = React.useContext(UserContext) || {};

  return (
    <nav className="flex items-center justify-center gap-6">
      <NavLink
        to="/conta"
        end
        className={({ isActive }) => (isActive ? "link-ativo" : "link-normal")}
      >
        <img
          src={minhasFotos}
          alt="Minhas Fotos"
          style={{ width: "20px", height: "20px" }}
        />
        {mobile && "Minhas Fotos"}
      </NavLink>
      <NavLink
        to="/conta/estatisticas"
        className={({ isActive }) => (isActive ? "link-ativo" : "link-normal")}
      >
        <img
          src={estatisticas}
          alt="Estatísticas"
          style={{ width: "20px", height: "20px" }}
        />
        {mobile && "Estatísticas"}
      </NavLink>
      <NavLink
        to="/conta/postar"
        className={({ isActive }) => (isActive ? "link-ativo" : "link-normal")}
      >
        <img
          src={adicionarFotos}
          alt="Adicionar Fotos"
          style={{ width: "20px", height: "20px" }}
        />
        {mobile && "Adicionar Fotos"}
      </NavLink>
      <button onClick={userLogout}>
        <img src={sair} alt="Sair" style={{ width: "20px", height: "20px" }} />
        {mobile && "Sair"}
      </button>
    </nav>
  );
};

export default UserHeaderNav;
