import { USER_CREATE } from "../../api";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../../src/UserContext";
import React from "react";
import useFetch from "../../Hooks/useFetch";

const LoginCreate: React.FC = () => {
  const username = useForm("username");
  const email = useForm("email");
  const password = useForm("password");

  const context = React.useContext(UserContext);
  // const { userLogin } = UserStorage(UserContext);

  if (!context) return null;
  const { userLogin } = context;

  const { loading, error, request } = useFetch();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { url, options } = USER_CREATE({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options);
    if (response.ok) userLogin(username.value, password.value);
  }

  return (
    <section>
      <h1>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario</label>
        <input type="text" id="username" name="username" {...username} />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" {...email} />
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" name="password" {...password} />
        {loading ? (
          <button disabled>Cadastrando...</button>
        ) : (
          <button disabled={loading} type="submit">
            Cadastrar
          </button>
        )}
        {error ? <p className="text-red-500 text-xs">{error}</p> : null}
      </form>
    </section>
  );
};

export default LoginCreate;
