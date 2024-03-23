# O que precisamos para trabalhar para esse projeto?

- Nodejs
- VSCode
- SQLite3

## Como instalar NodeJs

### Linux

Recomendo uso do NVM (Node Version Management)

```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Depois de instalado é necessário acrescentar o codigo abaixo ao `~/.bash_profile`, `~/.bashrc`, `~/.zshrc`.

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Depois de instalado usar o comando abaixo para instalar o NodeJS versão LTS

```bash
  nvm install --lts

  nvm use --lts
```

### Windows

Instalar NVS (Node Version Switcher)

```bash
winget install jasongin.nvs
```

ou

Download do pacote MSI no link -> https://github.com/jasongin/nvs/releases

Depois de instalado usar o comando abaixo para instalar o NodeJS versão LTS

```bash
nvs add lts

nvs link lts
```

## Começando com Projeto

Criando a pasta do projeto

```bash
  mkdir registro-ligacoes
  cd registro-ligacoes
```

Criando o projeto NodeJS com NPM

```bash
  npm init
```

instalando as bibliotecas necessárias para o projeto

```bash
  npm install express knex knex-paginate sqlite3 --save # dependência para produção
  npm install nodemon --save-dev # ambiente de desenvolvimento
```

Feito os passos anteriores nós vamos ter uma estrutura de pasta parecida com o mostrado abaixo

```bash
  |- registro-ligacoes
  |__ node_modules/
  |__ package.json
  |__ package-lock.json
```

### Primeiras linhas de códigos

Crie um arquivo chamado `app.js` e abra-o no `Visual Studio Code`

```bash
touch app.js
code .
```

começamos importando a biblioteca do `express` para nosso projeto e criando a estrutura básica da nossa API usando o ExpressJS

```js
import express from `express`

const app = express()
const port = 3010

app.get('/', function (req, res)=>{
  res.status(200).json({mensagem: 'Hello World'})
})

app.listen(port, () =>{
  console.log(`Respondendo na URL http://localhost:${port}`)
})
```

### Código criado, como rodar meu programa?

Para fazer nossa pequena API funcionar basta usar o comando `node app.js` e abrir o link no navegador.

Mas para maior praticidade vamos usar a biblioteca do `nodemon` para facilitar nossa vida. Abra o arquivo `package.json` e adicione as seguintes linhas.

```json
{
	"name": "registro-ligacoes-node",
	"version": "1.0.0",
	"description": "",
	"main": "app.js",
	"type": "module", // indica para o Node usar o sistema de modules do JS, por exemplo usar o `import`
	"scripts": {
		"dev": "nodemon app.js" // cria um script para automatizar tarefas ex: `npm run dev`
	},
	"author": "",
	"license": "ISC",
	"dependencies": {
		"express": "^4.18.3",
		"knex": "^3.1.0",
		"knex-paginate": "^3.1.1",
		"sqlite3": "^5.1.7"
	},
	"devDependencies": {
		"nodemon": "^3.1.0"
	}
}
```

Com as alterações feitas basta usar o comando `npm run dev` para executar o script e deixar que o `nodemon` fique procurando por alterações no código e automaticamente faca o reload da API.

## Knex

Comando uteis do Knex

```bash
npx knex init #cria o arquivo knexfile.js

npx knex migrate:make ligacoes
npx knex migrate:up
npx knex migrate:down

npx knex seed:make users
npx knex seed:run

```
