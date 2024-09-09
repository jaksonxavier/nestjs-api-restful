# Nest.js API RESTfull Template

**A robust and scalable NestJS API template.**

## Description

This repository provides a well-structured template for creating new NestJS projects. It includes best practices, common configurations, and a solid foundation for building RESTful APIs.

## Getting started

### Prerequisites
* **Node.js:** Version 20.14.0 or higher
* **pnpm:** Version 9.6.0 or higher

```bash
# 1. Clone the repository or click on "Use this template" button.
git clone https://github.com/jaksonxavier/nestjs-api-restful my-nest-app

# 2. Enter your newly-cloned folder.
cd my-nest-app

# 3. Create Environment variables file.
cp .env.example .env

# 3. Install dependencies. (Make sure pnpm is installed: https://pnpm.io/cli/install)
pnpm install
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change configurations in `.env`
- [ ] Remove the `.github` folder which contains the funding info
- [ ] Clean up the README.md file

### Development
```bash
# 4. Run development server and open http://localhost:3333
pnpm start:dev
# 5. Read the documentation linked below for "Setup and development".
```

### Build

To build the App, run

```bash
pnpm build:prod
```

And you will see the generated file in `dist` that ready to be served.
