import { Link } from "react-router-dom";
import Dogs from "../Assets/github.png";

const Header = () => {
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
        <Link to="/login">Login / Criar</Link>
      </nav>
    </header>
  );
};

export default Header;
