/*
    Chart Entity.
*/


const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const chart = sequelize.define('Chart', {
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        users_id: {
            type: DataTypes.STRING,
            allowNull: false
        },

        chart_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        chart_extension: {
            type: DataTypes.STRING,
            allowNull: false
        },

        chart_type: {
            type: DataTypes.STRING,
            allowNull: false
        },

        path_chart: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        created: {
            type: DataTypes.DATE
        }
        
    }, {
        tableName : "charts",
        timestamps: false
    }
);

module.exports = chart;