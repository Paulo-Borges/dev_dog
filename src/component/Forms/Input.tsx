const Input = ({
  label,
  type,
  name,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  name?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
      />
      <p className="text-red-500 text-xs">Error</p>
    </>
  );
};

export default Input;
