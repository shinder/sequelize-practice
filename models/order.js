'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
        }
    }

    Order.init({
        memberId: {
            type: DataTypes.INTEGER,
            references:{
                model: 'Members',
                key: 'id',
            },
            allowNull: false,
        },
        amounts: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        canceled: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        // 建立時間使用 createdAt
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};