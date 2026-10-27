import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    fetch("https://dogsapi.origamid.dev/json/jwt-auth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
      });
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
