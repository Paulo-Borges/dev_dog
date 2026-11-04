const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
}: {
  label: string;
  type?: string;
  name?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string | null;
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        placeholder={label}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </>
  );
};

export default Input;
