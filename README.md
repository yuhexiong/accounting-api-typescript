# Accounting Server

## Overview

- Language: Typescript
- Web FrameWork: Express
- DataBase: MariaDB v10.5

## ENV

copy .env.example and rename as .env

```bash
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=

PORT =
```

## Run

### install dependencies

```bash

npm install

```

### generate migration file and transition database schema

```bash

npm run migration:generate
npm run migration:run

```

### run

```bash

npm start

```

## API