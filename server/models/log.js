const {DataTypes} = require('sequelize');
const db = require("../db");

const Log = db.define('log', {
    description : {
        type: DataTypes.STRING,
        allownull: false
    },
    definition : {
        type: DataTypes.STRING,
        allownull: false
    },
    result : {
        type: DataTypes.STRING,
        allownull: false
    },
    owner_id : {
        type: DataTypes.INTEGER,
        allownull: false
    },
});

module.exports = Log;