const sequelize = require('sequelize');
const db = require('../config/database');

var Disciplina = db.define('subject',
    {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: sequelize.STRING,
        totalHours: sequelize.INTEGER,
        category: sequelize.STRING
    },
    {
        timestamps: false,
        tableName: 'subject'
    }
);

module.exports = Disciplina;
