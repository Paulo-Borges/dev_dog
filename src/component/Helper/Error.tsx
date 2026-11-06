const Error: React.FC<{ error: string }> = ({ error }) => {
  if (!error) return null;
  return <p style={{ color: "red" }}>{error}</p>;
};

export default Error;
