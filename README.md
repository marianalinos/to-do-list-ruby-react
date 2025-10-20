## To‑Do List com Ruby on Rails + React

Este é um projeto de lista de tarefas com backend em Ruby on Rails e frontend em React. O ambiente está totalmente dockerizado para rodar com um único comando, usando PostgreSQL como banco de dados.

Quis focar em um projeto simples, mas funcional e com boa experiência de desenvolvimento: uma API clara, com frontend intuitivo e execução facilitada via Docker.

---

## Pré‑requisitos

Antes de começar, tenha instalado:

- Docker e Docker Compose

> Não é necessário configurar Ruby, Node ou PostgreSQL localmente — os containers cuidam disso.

---

## Estrutura e Serviços

- db: PostgreSQL (porta 5432)
- backend: Rails API (porta 3000)
- frontend: React + Vite (porta 5173)

---

## Como rodar

1) Clonar o repositório

```bash
git clone https://github.com/marianalinos/to-do-list-ruby-react.git
cd to-do-list-ruby-react
```

2) Subir os containers

```bash
docker compose up --build
```

3) Acessos

- Frontend: http://localhost:5173
- Backend (API): http://localhost:3000/api

---

Obrigada por conferir o projeto! Agradeço previamente as possíveis sugestões de melhorias. Com mais tempo, gostaria de adicionar ao projeto:
- Autenticação/login para usuários;
- Colaboração entre os usuários, para que X possa colaborar na lista de Y. 
