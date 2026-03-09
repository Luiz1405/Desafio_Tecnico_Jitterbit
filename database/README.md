# Configuração do Banco de Dados

## Criar o banco de dados PostgreSQL

### Opção 1: Via psql (linha de comando)

```bash
psql -U postgres -c "CREATE DATABASE jitterbit;"
```

### Opção 2: Via arquivo SQL

```bash
psql -U postgres -f create_database.sql
```

### Opção 3: Via pgAdmin

1. Abra o pgAdmin
2. Conecte-se ao servidor PostgreSQL
3. Clique com botão direito em "Databases"
4. Selecione "Create" > "Database"
5. Digite o nome: `jitterbit`
6. Clique em "Save"

## Configurar o arquivo .env

Copie o arquivo `env.example` para `.env` e ajuste as variáveis conforme necessário:

```bash
cp env.example .env
```

Edite o arquivo `.env` com suas credenciais do PostgreSQL.

## As tabelas serão criadas automaticamente

Quando você iniciar o servidor com `npm start`, as tabelas `Order` e `Items` serão criadas automaticamente.
