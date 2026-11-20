# 🐶 Dogs — Rede social para cachorros

> 🚧 **Projeto em desenvolvimento.** Algumas telas ainda estão como placeholder e serão implementadas nas próximas etapas.

Aplicação web em **React + TypeScript** inspirada em uma rede social de fotos de cachorros, desenvolvida durante o curso de React da [Origamid](https://www.origamid.com/). O usuário pode criar uma conta, fazer login, e (em breve) postar fotos dos seus pets, ver o feed e acompanhar estatísticas de visualização.

O back-end é a API pública **Dogs API** (WordPress + JWT): `https://dogsapi.origamid.dev/json`.

---

## ✨ Funcionalidades

| Status | Funcionalidade |
| :----: | -------------- |
| ✅ | Cadastro de usuário com validação de campos |
| ✅ | Login com autenticação via **JWT** |
| ✅ | Login automático (token salvo no `localStorage` e validado ao abrir o app) |
| ✅ | Logout com limpeza de estado e redirecionamento |
| ✅ | Rota protegida `/conta` (só acessível com usuário logado) |
| ✅ | Header dinâmico (mostra o nome do usuário logado ou link de login) |
| 🚧 | Feed de fotos |
| 🚧 | Postagem de fotos (`/conta/postar`) |
| 🚧 | Estatísticas do usuário (`/conta/estatisticas`) |
| 🚧 | Recuperação e reset de senha |
| 🚧 | Página de foto individual e perfil público |

---

## 🛠️ Tecnologias

- **[React 19](https://react.dev/)** — biblioteca de UI
- **[TypeScript 6](https://www.typescriptlang.org/)** — tipagem estática
- **[Vite 8](https://vite.dev/)** — bundler e servidor de desenvolvimento
- **[React Router DOM 7](https://reactrouter.com/)** — rotas aninhadas e navegação
- **[Tailwind CSS 4](https://tailwindcss.com/)** — estilização utilitária (via `@tailwindcss/vite`)
- **[vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr)** — importação de SVG como componente React
- **[ESLint](https://eslint.org/)** + `typescript-eslint` + `eslint-plugin-react-hooks` — qualidade de código

---

## 🧱 Como é feito (arquitetura)

### Gerenciamento de estado global — Context API

O estado do usuário é centralizado com **Context API**, separado em dois arquivos:

- [`src/UserContext.tsx`](src/UserContext.tsx) — cria o contexto e define os tipos `User` e `UserContextType`.
- [`src/UserStorage.tsx`](src/UserStorage.tsx) — Provider que contém a lógica de autenticação:
  - `userLogin(username, password)` → obtém o token, salva no `localStorage`, busca o usuário e navega para `/conta`;
  - `userLogout()` → limpa o estado e o token e volta para `/login`;
  - `autoLogin` (em um `useEffect`) → valida o token salvo ao carregar a aplicação.

O estado `login` tem três valores: `null` (verificando token), `true` (logado) e `false` (deslogado) — isso evita que a rota protegida redirecione antes da validação terminar.

### Camada de API

[`src/api.tsx`](src/api.tsx) concentra os endpoints. Cada função retorna `{ url, options }`, prontos para o `fetch`, deixando os componentes livres de detalhes de URL/headers:

| Função | Método | Endpoint |
| ------ | ------ | -------- |
| `TOKEN_POST` | POST | `/jwt-auth/v1/token` |
| `TOKEN_VALIDATE_POST` | POST | `/jwt-auth/v1/token/validate` |
| `USER_GET` | GET | `/api/user` |
| `USER_CREATE` | POST | `/api/user` |

> A pasta [`src/api/`](src/api/) contém componentes de teste usados para explorar a API durante o desenvolvimento (não fazem parte do fluxo principal).

### Custom Hooks

- [`useFetch`](src/Hooks/useFetch.tsx) — encapsula `fetch` com estados de `data`, `loading` e `error`; a função `request` é memorizada com `useCallback` e retorna `{ response, json }`.
- [`useForm`](src/Hooks/useForm.tsx) — controla o valor de um input e faz a validação (`email`, `username`, `password`) via regex, com validação no `onBlur` e revalidação no `onChange` após o primeiro erro.

### Rotas

Definidas com **React Router v7**, usando rotas aninhadas (`/*`):

```
/                     → Home
/login                → LoginForm
/login/criar          → LoginCreate
/login/perdeu         → LoginPasswordLost   (🚧)
/login/resetar        → LoginPasswordReset  (🚧)
/conta                → Feed do usuário     (🔒 protegida)
/conta/postar         → UserPhotoPost       (🔒 🚧)
/conta/estatisticas   → UserStats           (🔒 🚧)
```

A proteção é feita pelo componente [`ProtectedRoute`](src/component/Helper/ProtectedRoute.tsx), que redireciona para `/login` quando não há usuário autenticado. Já o [`Login`](src/component/Login/Login.tsx) redireciona para `/conta` se o usuário já estiver logado.

---

## 📁 Estrutura de pastas

```
src/
├── api/                  # Componentes de teste dos endpoints (estudo)
├── api.tsx               # Funções que montam as requisições da API
├── Assets/               # Imagens e arquivos estáticos
├── component/
│   ├── Feed/             # Feed de fotos
│   ├── Forms/            # Componentes reutilizáveis (Input, Button)
│   ├── Helper/           # ProtectedRoute, Error
│   ├── Login/            # Login, cadastro, recuperação de senha
│   ├── User/             # Área do usuário (header, postar, estatísticas)
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Home.tsx
├── Hooks/                # useFetch, useForm
├── UserContext.tsx       # Contexto + tipos do usuário
├── UserStorage.tsx       # Provider com a lógica de autenticação
├── App.tsx               # Rotas e layout principal
└── main.tsx              # Ponto de entrada
```

---

## 🚀 Como rodar o projeto

**Pré-requisitos:** [Node.js](https://nodejs.org/) 20+ e npm.

```bash
# Clonar o repositório
git clone https://github.com/Paulo-Borges/dev_dog.git
cd dev_dog

# Instalar as dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

### Scripts disponíveis

| Comando | Descrição |
| ------- | --------- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Checa os tipos (`tsc -b`) e gera o build de produção |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Executa o ESLint |

---

## 🗺️ Próximos passos

- [ ] Implementar o Feed com listagem e paginação de fotos
- [ ] Formulário de postagem de foto (nome, peso, idade e imagem)
- [ ] Página de estatísticas com gráficos
- [ ] Fluxo de recuperação/reset de senha
- [ ] Modal e página de foto individual com comentários
- [ ] Estilização completa e responsividade
- [ ] Deploy

---

## 👤 Autor

Feito por **Borges** — [GitHub](https://github.com/Paulo-Borges)
