# precelight-backend

Repositório do backend do Precelight! Aqui você encontrará o que precisa para configurar e rodar o projeto, além de informações sobre o design pattern e a estrutura de testes.

## Arquitetura do Projeto

### Estrutura do Projeto

O projeto segue uma estrutura organizada para facilitar a manutenção e a escalabilidade. Aqui está uma visão geral das principais pastas e arquivos:

  - **src/**: Contém o código-fonte do aplicativo.
  - **controllers/**: Controladores que lidam com as requisições HTTP.
  - **models/**: Modelos que definem a estrutura de dados e dos documentos no MongoDB.
  - **routes/**: Definição das rotas da API.
  - **services/**: Contém a lógica de negócios e interações com os modelos.
  - **middleware/**: Middlewares para autenticação e outras funcionalidades.
  - **config/**: Configurações do banco de dados e outras gerais.

### Design Patterns

O projeto utiliza alguns design patterns comuns para manter o código organizado e fácil de entender:

- **MVC (Model-View-Controller)**: A arquitetura do projeto segue o padrão MVC, onde:
  - **Model**: Representa a estrutura dos dados e interage com o banco de dados (definido em `src/models`).
  - **Controller**: Lida com as requisições HTTP, chamando os serviços apropriados e retornando as respostas (definido em `src/controllers`).
  - **Service**: Contém a lógica de negócios e interage com os modelos (definido em `src/services`).

- **Middleware**: Utilizado para adicionar funcionalidades como autenticação e manipulação de requisições/respostas (definido em `src/middleware`).

### Variáveis de Ambiente

As variáveis de ambiente são usadas para configurar o comportamento do aplicativo sem a necessidade de alterar o código. Elas são definidas em um arquivo `.env` na raiz do projeto. Aqui estão as principais variáveis de ambiente utilizadas:

- **PORT**: Porta em que o servidor irá rodar.
- **MONGO_URI**: URI de conexão com o banco de dados MongoDB.
- **BASIC_AUTH_USERNAME**: Nome de usuário para autenticação básica.
- **BASIC_AUTH_PASSWORD**: Senha para autenticação básica.

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




