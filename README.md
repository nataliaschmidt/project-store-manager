# Store Manager

O objetivo do projeto é desenvolver uma API RESTfull utilizando a arquitetura em camadas MSC (Model-Service-Controller).

A API desenvolvida é um sistema de gerenciamento de vendas na qual é possível criar, visualizar, deletar e atualizar produtos e vendas.

Foram desenvolvidos os testes para garantir as funcionalidades das implementações.

## Tecnologias Utilizadas
<hr>

- Docker
- Node.js
- Express
- MySQL
- Mocha
- Sinon
- Chai

## Instruções
<hr>

- Clone este repositório.

```bash
git clone git@github.com:nataliaschmidt/project-store-manager.git
```
- Acesse o diretório do porjeto e instale suas dependências
```bash
npm install
```

- Inicie os containers do compose `backend` e `db`
```bash
docker-compose up -d
```

A aplicação estará disponível em `http://localhost:3001` em modo de desenvolvimento

É possível ver os logs da aplicação com 
```bash
docker logs -n 10 -f store_manager
```