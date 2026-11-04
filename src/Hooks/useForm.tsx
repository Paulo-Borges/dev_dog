import { useState } from "react";

const types = {
  email: (value: string) =>
    /\S+@\S+\.\S+/.test(value) ? null : "Email inválido",
};

const useForm = (type: string) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function validate(value: string) {
    if (type === false) return true;
    if (value.length === 0) {
      setError("Campo obrigatório");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError("Email inválido");
      return false;
    } else {
      setError(null);
      return true;
    }
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
