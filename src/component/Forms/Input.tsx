const Input = ({
  label,
  type,
  name,
}: {
  label: string;
  type?: string;
  name?: string;
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input placeholder={label} type={type} name={name} id={name} />
      <p className="text-red-500 text-xs">Error</p>
    </>
  );
};

export default Input;
