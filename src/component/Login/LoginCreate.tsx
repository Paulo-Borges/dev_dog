import { USER_CREATE } from "../../api";
import useForm from "../../Hooks/useForm";

const LoginCreate: React.FC = () => {
  const username = useForm("text");
  const email = useForm("text");
  const password = useForm("password");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { url, options } = USER_CREATE({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const response = await fetch(url, options);
    console.log(username.value, email.value, password.value);
    console.log(response);
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
        <button type="submit">Cadastrar</button>
      </form>
    </section>
  );
};

export default LoginCreate;
