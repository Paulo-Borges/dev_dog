import React from "react";
import { UserContext, type User } from "./UserContext"; // Importa do arquivo criado acima
// @CLAUDE: passei a importar também o tipo User (usado no useState de "data")
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import { useNavigate } from "react-router-dom";

export const UserStorage = ({ children }: { children: React.ReactNode }) => {
  // @CLAUDE: era useState<string | null>; o usuário vindo da API é um objeto, então agora é User | null
  const [data, setData] = React.useState<User | null>(null);
  const [login, setLogin] = React.useState<boolean | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  //X-----------------X--------------------X---PRA DESLOGAR-------------------X-------------X------
  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setLogin(false);
      setLoading(false);
      setError(null);
      window.localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate],
  );

  //X-----------------X--------------------X---PRA PEGAR USER-------------------X-------------X------
  async function getUser(token: string) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  //X-----------------X--------------------X---PRA LOGAR-------------------X-------------X------
  async function userLogin(username: string, password: string) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/conta");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token validation failed");
          await getUser(token);
        } catch {
          // @CLAUDE: removi o "(err)" porque ele não era usado (o ESLint acusava no-unused-vars)
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{
        userLogin: userLogin,
        usuario: data,
        userLogout: userLogout,
        login: login,
        loading: loading,
        error: error,
        data: data,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
