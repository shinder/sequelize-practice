'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
        }
    }

    Product.init({
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bookname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references:{
                model: 'Categories',
                key: 'id',
            }
        },
        bookId: {
            type: DataTypes.STRING
        },
        publishDate: {
            type: DataTypes.DATE
        },
        pages: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        isbn: {
            type: DataTypes.STRING,
        },
        introduction: {
            type: DataTypes.STRING(500),
        },
        visible: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        }
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};