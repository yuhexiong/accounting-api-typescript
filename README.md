# Accounting Api
Automatically run CronJob to generate last month report on 1st of every month.  
Automatically generate swagger by comment in router.

## Overview

- Language: Typescript
- Web FrameWork: Express
- DataBase: MariaDB v10.9

## ENV

copy .env.example and rename as .env

```bash
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=

# port 
PORT=

# swagger
SWAGGER_MOUNT_PATH=/api

# insert basic data
INSERT_DATA=true
```
**If INSERT_DATA === true, it will insert 7 common types.**  
**(Only set true when you use new db plz)**  
- FOOD/食物
- SHOPPING/購物
- ENTERTAINMENT/娛樂
- EXERCISE/運動
- TRANSPORTATION/交通費
- UTILITY/水電費
- OTHER/其他

## Run

### install dependencies

```bash

npm install

```

### run migration file

```bash

npm run migration:run

```

### run

```bash

npm start

```

## API

### type

- `POST /type`：新增一項類別
- `GET /type`：取得所有類別
- `GET /type/{id}`：取得一項類別
- `PATCH /type/{id}/{name}`：更新一項類別名稱
- `DELETE /type/{id}`：刪除一項類別, 將有使用的typeId改為OTHER, 預設OTHER不能刪除

### consumption

- `POST /consumption`：新增一筆消費
- `GET /consumption/{id}`：取得一筆消費
- `GET /consumption`：取得所有消費 可限定年月
- `PUT /consumption/{id}`：更新一筆消費
- `DELETE /consumption/{id}`：刪除一項消費

### report

- `GET /report/{year}/{month}`：取得指定年月報表
