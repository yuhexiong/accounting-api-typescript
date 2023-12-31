# Accounting Api

### Frontend Web - [Accounting Web JavaScript](https://github.com/yuhexiong/accounting-web-vue3-javascript)

Automatically run CronJob to generate last month report on 1st of every month.  
Automatically generate swagger by comment in router.

## Overview

- Language: TypeScript
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
INSERT_CHINESE_DATA=false
INSERT_ENGLISH_DATA=true
```
**(Only set true when you use new db plz)**  
**If INSERT_CHINESE_DATA === true, insert 7 common types with Chinese.**  
**If INSERT_ENGLISH_DATA === true, insert 7 common types with english. Then type.name = type.id**

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

npm run start

```

## ER Diagram
![image](https://github.com/yuhexiong/accounting-api-typescript/blob/main/image/accounting_schema_v2.png)


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

- `POST /report/{year}/{month}`：產生指定年月報表
- `GET /report/{year}/{month}`：取得指定年月報表