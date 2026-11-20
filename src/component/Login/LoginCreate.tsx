import { USER_CREATE } from "../../api";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../../src/UserContext";
import React from "react";
import useFetch from "../../Hooks/useFetch";
import Input from "../Forms/Input"; // @CLAUDE: import do componente Input usado nos campos

const LoginCreate: React.FC = () => {
  const username = useForm("username");
  const email = useForm("email");
  const password = useForm("password");

  const context = React.useContext(UserContext);
  // const { userLogin } = UserStorage(UserContext);

  // @CLAUDE: subi o useFetch() para ANTES do "if (!context) return null".
  // Hooks precisam ser chamados sempre, na mesma ordem e antes de qualquer return (regra dos Hooks).
  const { loading, error, request } = useFetch();

  if (!context) return null;
  const { userLogin } = context;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // @CLAUDE: agora valida os campos antes de enviar (igual ao LoginForm).
    // Chamo os 3 validate() antes do "if" para que todos os erros apareçam de uma vez.
    const isUsernameValid = username.validate();
    const isEmailValid = email.validate();
    const isPasswordValid = password.validate();
    if (!isUsernameValid || !isEmailValid || !isPasswordValid) return;

    const { url, options } = USER_CREATE({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options);
    // @CLAUDE: "response" pode ser null (ex.: falha de rede), por isso o "response &&"
    if (response && response.ok) userLogin(username.value, password.value);
  }

  return (
    <section>
      <h1>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        {/* @CLAUDE: troquei os <label> + <input> pelo componente Input (igual ao LoginForm).
            Assim as mensagens de erro do useForm aparecem embaixo de cada campo.
            O email também passou a usar type="email". */}
        <Input label="Usuario" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
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
