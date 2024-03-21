
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
```

Criando o projeto NodeJS com NPM

```bash
  npm init
```
