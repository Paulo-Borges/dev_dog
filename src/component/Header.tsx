import React from "react";

import { Link } from "react-router-dom";
import Dogs from "../Assets/github.png";
import { UserContext } from "../UserContext";

const Header = () => {
  const { data: data, userLogout: userLogout } =
    React.useContext(UserContext) || {};
  console.log(data);

  return (
    <header className="bg-gray-200 shadow p-4 top-0 fixed w-full">
      <nav className="flex items-center justify-between h-4">
        <Link to="/">
          <img
            src={Dogs}
            alt="Dogs"
            style={{ width: "30px", height: "30px" }}
          />
        </Link>

        {data ? (
          <>
            <Link to="/conta">{data.nome}</Link>
            <button onClick={userLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login"> Login / Criar</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
