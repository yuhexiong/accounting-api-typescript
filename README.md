# Fee API

## Version

- Typescript v4.9.5
- MariaDB v10.5

## ENV

copy .env.example and rename as .env

```bash
NODE_ENV=production

# local database
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=

# port
PORT =
```

## Run

```bash
# install dependencies
npm install

# run
npm start

# run test case
npm test

```

## API

### Request

`GET /getFee`

    curl --location 'localhost:8080/getFee?birthday=0520102&systemDate=2021-10-27'

### Response

    HTTP/1.1 200 OK
    Status: 200 OK

    {"amount": 150}

### Request

`POST /getPatient`

    curl --location 'localhost:8080/getPatient' \
    --header 'Content-Type: application/json' \
    --data '{"patientId":3, "systemDate":"2012-10-27"}'

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

    {
        "patient": {
            "id": 3,
            "name": "莊小云",
            "birth": "0771003",
            "gender": "女",
            "age": 24,
            "nationality": "台灣"
        },
        "amount": 150
    }

---

## [TypeORM](https://github.com/typeorm/typeorm)

## MariaDB

- [Error Code](https://mariadb.com/docs/reference/es10.4/error-codes/#error-codes-in-10-4)

### docs

- [Indices](https://github.com/typeorm/typeorm/blob/master/docs/indices.md)
- [Entites](https://github.com/typeorm/typeorm/blob/master/docs/entities.md)
- [One-to-one relations](https://github.com/typeorm/typeorm/blob/master/docs/one-to-one-relations.md)
- [Many-to-one / one-to-many](https://github.com/typeorm/typeorm/blob/master/docs/many-to-one-one-to-many-relations.md)
- [Many-to-many relations](https://github.com/typeorm/typeorm/blob/master/docs/many-to-many-relations.md)
- [Swagger](https://swagger.io/specification/)
