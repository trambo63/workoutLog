const {DataTypes} = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    username : {
        type: DataTypes.STRING,
        allownull: false
    },
    passwordhash : {
        type: DataTypes.STRING,
        allownull: false,
    }
})

module.exports = User;
