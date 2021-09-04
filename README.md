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

## 建立測試的 Model

``` bash
npx sequelize model:generate --name User --attributes firstName:string,lastName:string,birthday:dateOnly
```

將產生一個 migration 檔和一個 Model 檔，查看 Model ```user.js``` 的寫法，以利之後仿造寫法。

``` js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthday: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
```


