# API Desafio Técnico Jitterbit

API RESTful para gerenciamento de pedidos desenvolvida em Node.js e Javascript, utilizando arquitetura MVC, autenticação JWT e documentação Swagger.

## Tecnologias e Bibliotecas

### Dependências Principais
- **Node.js** - Runtime JavaScript
- **PostgreSQL** - Banco de dados relacional
- **pg** (^8.11.3) - Cliente PostgreSQL para Node.js
- **dotenv** (^16.3.1) - Gerenciamento de variáveis de ambiente
- **jsonwebtoken** (^9.0.2) - Geração e validação de tokens JWT
- **bcrypt** (^5.1.1) - Hash de senhas
- **swagger-jsdoc** (^6.2.8) - Geração de documentação Swagger

### Módulos Nativos Utilizados
- **http** - Servidor HTTP nativo do Node.js
- **crypto** - Geração de secret key para JWT

## Padrões Estabelecidos

### Arquitetura
- **MVC (Model-View-Controller)**
- **Repository Pattern** - Abstração de acesso a dados com interface
- **Service Layer** - Lógica de negócio isolada
- **Middleware Pattern** - Interceptação de requisições

### Padrões de Código
- **Early Return** - Retorno antecipado em caso de erro, evitando aninhamento
- **Sem uso de `else`** - Código mais limpo e linear
- **Funções privadas** - Validações e utilitários organizados em funções reutilizáveis
- **Validações centralizadas** - Funções de validação isoladas e testáveis

### Estrutura de Pastas
```
Desafio_Tecnico_Jitterbit/
├── config/              # Configurações (Swagger)
├── controllers/         # Controladores (HTTP)
├── database/            # Configuração e inicialização do banco
├── middleware/          # Middlewares (Autenticação)
├── repositories/       # Acesso a dados
│   ├── contratos/      # Interfaces/Contratos
│   └── postgres/       # Implementações PostgreSQL
├── routes/             # Rotas da API
├── services/           # Lógica de negócio
└── utils/              # Utilitários (validações, respostas, etc)
```

## Banco de Dados

### Tabelas

**Order**
- `orderId` (VARCHAR) - Chave primária
- `value` (DECIMAL) - Valor total do pedido
- `creationDate` (TIMESTAMP) - Data de criação

**Items**
- `orderId` (VARCHAR) - Chave estrangeira para Order
- `productId` (VARCHAR) - ID do produto
- `quantity` (INTEGER) - Quantidade
- `price` (DECIMAL) - Preço do item

**Users**
- `id` (SERIAL) - Chave primária
- `username` (VARCHAR) - Nome de usuário único
- `password` (VARCHAR) - Senha com hash bcrypt
- `createdAt` (TIMESTAMP) - Data de criação

## Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Copie o arquivo `env.example` para `.env` e configure:
```env
PORT=3000

DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jitterbit
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=chave_secreta
JWT_EXPIRES_IN=24h
```

**Nota:** Para o `JWT_SECRET`, recomenda-se usar o módulo nativo `crypto` do Node.js para gerar uma chave segura:
```javascript
require('crypto').randomBytes(64).toString('hex')
```

### 3. Criar banco de dados
```bash
psql -U postgres -c "CREATE DATABASE jitterbit;"
```

### 4. Iniciar servidor
```bash
npm start
```

As tabelas serão criadas automaticamente na primeira execução.

## Documentação Swagger

A documentação interativa da API está disponível em:
- **Interface Swagger UI:** `http://localhost:3000/swagger`
- **Especificação JSON:** `http://localhost:3000/swagger.json`

## Autenticação

A API utiliza autenticação JWT (JSON Web Token). Deixei as rotas de criar, atualizar e deletar pedidos com autenticação:

### Rotas Protegidas (requerem token)
- `POST /order` - Criar pedido
- `PUT /order/{numeroPedido}` - Atualizar pedido
- `PATCH /order/{numeroPedido}` - Atualizar pedido (parcial)
- `DELETE /order/{numeroPedido}` - Deletar pedido

### Rotas Públicas
- `GET /order/list` - Listar todos os pedidos
- `GET /order/{numeroPedido}` - Buscar pedido específico

### Como usar
1. Registrar ou fazer login em `/auth/register` ou `/auth/login`
2. Receber o token JWT na resposta
3. Incluir o token no header das requisições protegidas:
```
Authorization: Bearer seu_token_aqui
```

## Rotas da API

### Autenticação
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Fazer login

### Pedidos
- `GET /order/list` - Listar todos os pedidos
- `GET /order/{numeroPedido}` - Buscar pedido por número
- `POST /order` - Criar novo pedido (protegido)
- `PUT /order/{numeroPedido}` - Atualizar pedido completo (protegido)
- `PATCH /order/{numeroPedido}` - Atualizar pedido parcial (protegido)
- `DELETE /order/{numeroPedido}` - Deletar pedido (protegido)

## Exemplo de Requisição

### Criar Pedido
```bash
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer seu_token_aqui' \
--data '{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}'
```

## Segurança

- Senhas são hasheadas com **bcrypt** (10 salt rounds)
- Tokens JWT com expiração configurável
- Validação de dados em todas as entradas
- Autenticação obrigatória em rotas de modificação

## Estrutura de Código

O projeto segue alguns padrões que uso diariamente:
- **Controllers:** Apenas orquestração HTTP, sem lógica de negócio
- **Services:** Toda lógica de negócio e validações
- **Repositories:** Apenas acesso a dados, com interface para abstração
- **Utils:** Funções auxiliares reutilizáveis
- **Middleware:** Interceptação e validação de requisições

Luiz Augusto de Souza Kubaszewski
