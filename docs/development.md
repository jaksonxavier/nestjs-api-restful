# Setup and development

- [Setup and development](#setup-and-development)
  - [Installation](#installation)
    - [Database](#database)
    - [Configuration](#configuration)
    - [Dev server](#dev-server)
  - [Docker](#docker)
    - [Docker installation](#docker-installation)
    - [Docker-compose installation](#docker-compose-installation)
    - [Run](#run)


## Installation

```bash
# Install dependencies from package.json
pnpm install
```

> Note: don't delete pnpm-lock.yaml before installation, See more [in pnpm docs](https://pnpm.io/git/)

### Database

> Note: This template repository use [Prisma ORM](https://github.com/prisma/prisma) with Data Mapper pattern.

### Configuration

Before start install PostgreSQL and fill correct configurations in `.env` file

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASS=docker
DATABASE_NAME=app

JWT_SECRET_KEY=your-secret-key
JWT_PUBLIC_KEY=your-public-key
```

### Dev server
```bash
# Launch the dev server with file watcher
yarn start:dev

# Launch the dev server and enable remote debugger with file watcher
pnpm start:debug
```

## Docker

if you are familiar with [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose) then you can run built in docker-compose file, which will install and configure application and database for you.

### Docker installation

Download docker from Official website

- Mac <https://docs.docker.com/docker-for-mac/install/>
- Windows <https://docs.docker.com/docker-for-windows/install/>
- Ubuntu <https://docs.docker.com/install/linux/docker-ce/ubuntu/>

### Docker-compose installation

Download docker from [Official website](https://docs.docker.com/compose/install)

### Run

Open terminal and navigate to project directory and run the following command.

```bash
docker-compose up
```