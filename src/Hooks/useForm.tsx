import { useState } from "react";

const types = {
  email: {
    regex: /\S+@\S+\.\S+/,
    message: "Email inválido",
  },
  password: {
    regex: /^[a-zA-Z0-9]{3,}$/,
    message: "A senha precisa ter precisa ter pelo menos 3 caracteres.",
  },
  username: {
    regex: /^[a-zA-Z0-9]{3,}$/,
    message: "O nome de usuário precisa ter pelo menos 3 caracteres",
  },
};

type ValidatorType = keyof typeof types | false;

const useForm = (type: ValidatorType) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function validate(value: string) {
    if (type === false) return true;

    if (value.length === 0) {
      setError("Campo obrigatório");
      return false;
    }

    if (type && types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    }
    setError(null);
    return true;
  }

  function onChange({ target }: { target: HTMLInputElement }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
    error,
  };
};

export default useForm;
