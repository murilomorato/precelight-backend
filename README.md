# precelight-backend

Bem-vindo ao repositório do backend do Precelight! Aqui você encontrará tudo o que precisa para configurar e rodar o projeto, além de informações sobre os testes.

## Configuração do Projeto

### Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados na sua máquina.

### Passos para Configuração

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/precelight-backend.git
    cd precelight-backend
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Configure as variáveis de ambiente:**

    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```env
    PORT=3000
    MONGO_URI=sua-uri-do-mongodb
    BASIC_AUTH_USERNAME=seu-usuario
    BASIC_AUTH_PASSWORD=sua-senha
    ```

4. **Inicie o servidor:**

    ```bash
    npm run run-server
    ```

    O servidor estará rodando em `http://localhost:3000`.

## Testes

### Estrutura dos Testes

- **Testes Unitários:** Localizados na pasta `tests/unitTests`. Esses testes verificam funcionalidades isoladas dos serviços e controladores.
- **Testes Integrados:** Localizados na pasta `tests/integratedTests`. Esses testes verificam a integração entre diferentes partes do sistema, incluindo interações com o banco de dados.

### Testes Unitários e Integrados

O projeto utiliza o Jest para testes unitários e integrados. Os testes integrados utilizam o `mongodb-memory-server` para criar um banco de dados MongoDB em memória, garantindo que os testes não afetem o banco de dados de produção.
Utiliza também `supertest` para disparar requisições http para as rotas da Api.

### Rodando os Testes

Para rodar todos os testes e code coverage, use o comando:

```bash
npm test
```


