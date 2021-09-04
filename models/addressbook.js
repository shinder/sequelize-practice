'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AddressBook extends Model {
        static associate(models) {
        }
    }

    AddressBook.init({
        // 三個欄位自動給: id(int), createdAt(datetime), updatedAt(datetime)
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
        mobile: {
            type: DataTypes.STRING
        },
        birthday: {
            type: DataTypes.DATEONLY
        },
        address:{
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'AddressBook',
    });
    return AddressBook;
};