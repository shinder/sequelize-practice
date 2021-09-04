'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Product, {
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                foreignKey: {
                    name: 'categoryId'
                }
            });
            Category.hasMany(Category, {
                foreignKey: {
                    name: 'parentId'
                }
            });
        }
    }

    Category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parentId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            references:{
                model: Category,
                key: 'id',
            }
        },
        sequence: {
            type: DataTypes.INTEGER,
            defaultValue: 100,
        }
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};