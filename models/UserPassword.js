import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from './User.js';

const UserPassword =  sequelize.define(
    'UserPassword',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        website: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        iv: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

User.hasMany(UserPassword, { foreignKey: 'userId'});
UserPassword.belongsTo(User, {foreignKey: 'userId'});

export default UserPassword