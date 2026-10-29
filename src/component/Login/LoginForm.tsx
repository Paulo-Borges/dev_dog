import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import { USER_GET, TOKEN_POST } from "../../api";
import { useEffect } from "react";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) getUser(token);
  }, []);

  async function getUser(token: string) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!username.value || !password.value) return;
    const { url, options } = TOKEN_POST({
      username: username.value,
      password: password.value,
    });

    const response = await fetch(url, options);
    const json = await response.json();
    window.localStorage.setItem("token", json.token);
    getUser(json.token);
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Username" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />

        <button type="submit">Entrar</button>
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
