import { useState } from "react";
const useForm = () => {
  const [value, setValue] = useState("");

  function onChange({ target }: { target: HTMLInputElement }) {
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
  };
};

export default useForm;
