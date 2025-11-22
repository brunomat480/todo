# todo
<div> 
  <p><img align="center" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />ReactJS</p>
  <p><img align="center" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain.svg" />CSS</p>        
</div>
<img src="https://user-images.githubusercontent.com/69431006/233848036-8b416eff-edee-47eb-959e-4a79947a04aa.png" />

##

## API
Clone o repositório da API:
```bash
git clone https://github.com/brunomat480/todo-api.git
```
Entre na pasta da API:
```bash
cd todo-api
```
Baixe as dependências:
```bash
npm i
```
ou
```bash
yarn
```
ou
```bash
pnpm i
```

Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto da API:
```dotenv
DATABASE_URL="file:./dev.db"
API_GROQ_BASE_URL="https://api.groq.com/openai/v1"
API_KEY_GROQ="API_KEY"
MODEL_GROQ="llama-3.3-70b-versatile"
```

Inicie a API:
```bash
npm run dev
```
ou
```bash
yarn dev
```
ou
```bash
pnpm dev
```

##

## Web
Clone o repositório:
```bash
git clone https://github.com/brunomat480/todo.git
```
Baixe as dependências:
```bash
npm i
```
ou
```bash
yarn
```
ou
```bash
pnpm i
```

Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto web:
```dotenv
VITE_API_BASE_URL=http://localhost:3333
```

Inicie a aplicação:
```bash
npm run dev
```
ou 
```bash
yarn dev
```
ou
```bash
pnpm dev
```
