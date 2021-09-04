'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        static associate(models) {
        }
    }

    OrderDetail.init({
        // `order_sid`, `product_sid`, `price`, `quantity`
        orderId: {
            type: DataTypes.INTEGER,
            references:{
                model: 'Orders',
                key: 'id',
            },
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            references:{
                model: 'Products',
                key: 'id',
            },
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },

    }, {
        sequelize,
        modelName: 'OrderDetail',
    });
    return OrderDetail;
};