import React from "react";
import useMedia from "../../Hooks/useMedia";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext";
import minhasFotos from "../../Assets/page-edit.svg";
import estatisticas from "../../Assets/repeat.svg";
import adicionarFotos from "../../Assets/check.svg";
import sair from "../../Assets/stat-down.svg";

const UserHeaderNav: React.FC = () => {
  const { userLogout } = React.useContext(UserContext) || {};
  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="bg-gray-200 hover:bg-white hover:shadow-[0 0 0 3px #fea] rounded h-8 w-8 flex items-center justify-center border border-transparent hover:border-[#e0be67] hover:text-[#fb1] cursor-pointer after:content-['_'] after:block after:w-[1.2rem] after:h-[2px] after:bg-current after:shadow-[0_6px_currentColor,0_-6px_currentColor]"
        ></button>
      )}

      <nav
        className={`flex items-center justify-center gap-6 ${mobile ? "flex-col" : "block"}`}
      >
        <NavLink
          to="/conta"
          end
          className={({ isActive }) =>
            isActive ? "link-ativo" : "link-normal"
          }
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
          className={({ isActive }) =>
            isActive ? "link-ativo" : "link-normal"
          }
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
          className={({ isActive }) =>
            isActive ? "link-ativo" : "link-normal"
          }
        >
          <img
            src={adicionarFotos}
            alt="Adicionar Fotos"
            style={{ width: "20px", height: "20px" }}
          />
          {mobile && "Adicionar Fotos"}
        </NavLink>
        <button onClick={userLogout}>
          <img
            src={sair}
            alt="Sair"
            style={{ width: "20px", height: "20px" }}
          />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
