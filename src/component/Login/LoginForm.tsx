import { Link } from "react-router-dom";
import React, { useContext } from "react";
import Error from "../Helper/Error";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";

const LoginForm = () => {
  const { userLogin, error, loading } = useContext(UserContext) || {};

  const username = useForm("text");
  const password = useForm("password");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin?.(username.value, password.value);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuario" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <button disabled>Loading...</button>
        ) : (
          <button type="submit">Entrar</button>
        )}
        <Error error={error} />
      </form>
      <Link
        to="/login/criar"
        className="pointer border-none bg-amber-300 hover:bg-amber-500 rounded p-2"
      >
        Cadastro
      </Link>
    </section>
  );
};

export default LoginForm;
