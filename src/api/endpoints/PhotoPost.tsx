import { useState } from "react";

const PhotoPost = () => {
  const [token, setToken] = useState("");
  const [nome, setNome] = useState("");
  const [peso, setPeso] = useState("");
  const [idade, setIdade] = useState("");
  const [img, setImg] = useState<File | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData();
    if (img) formData.append("img", img);
    formData.append("nome", nome);
    formData.append("peso", peso);
    formData.append("idade", idade);

    fetch("https://dogsapi.origamid.dev/json/api/photo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        return json;
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={token}
        placeholder="token"
        onChange={({ target }) => setToken(target.value)}
      />
      <input
        type="text"
        value={nome}
        placeholder="nome"
        onChange={({ target }) => setNome(target.value)}
      />
      <input
        type="text"
        value={peso}
        placeholder="Peso"
        onChange={({ target }) => setPeso(target.value)}
      />

      <input
        type="text"
        value={idade}
        placeholder="Idade"
        onChange={({ target }) => setIdade(target.value)}
      />

      <input
        type="file"
        onChange={({ target }) => setImg(target.files ? target.files[0] : null)}
      />
      <button>Enviar</button>
    </form>
  );
};

export default PhotoPost;
