'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Member extends Model {
        static associate(models) {
        }
    }

    Member.init({
        email: {
            // 當帳號使用
            type: DataTypes.STRING(120),
            allowNull: false,
            unique: true, // 比較舊的 DB, key 的長度不要太長
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        birthday: {
            type: DataTypes.DATEONLY,
        },
        hash: {
            type: DataTypes.STRING,
        },
        activated: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        suspended: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    }, {
        sequelize,
        modelName: 'Member',
    });
    return Member;
};