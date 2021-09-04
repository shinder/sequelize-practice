# Sequelize 練習

## 環境準備

``` bash
# 在新專案目錄初始化
npm init -y

# 安裝必須套件 mysql2 和 sequelize
npm i mysql2 sequelize

# 安裝工具套件
npm i --save-dev sequelize-cli
```

## 以 sequelize-cli 初始化

``` bash
npx sequelize init
```

將新增 4 個資料夾：config, migrations, models, seeders 和兩個檔案：config/config.json, models/index.js。
models/index.js 用來載入所有的 models。
config/config.json 設定資料庫連線所需的帳密，並加入資料編碼的設定。

``` json
/* 只列出 development 的設定 */
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      "charset": "utf8mb4",
      "collate": "utf8mb4_general_ci" 
    }
  }
```
