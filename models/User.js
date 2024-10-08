import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db.js";

const User =  sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            },
        login: {
                type: DataTypes.STRING,
            },
        email: {
                type: DataTypes.STRING,
                unique: true,
            },
        password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        secretKey: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );

export default User;