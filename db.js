import dotenv from 'dotenv'
import Sequelize from 'sequelize';
import config from './config/config.js';

dotenv.config({ path: '.env' }); // Подгружаем файл .env.

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

let sequelize;

if (dbConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[dbConfig.use_env_variable], {
        dialect: dbConfig.dialect,
        dialectOptions: {
            ssl: {
                require: false,
                rejectUnauthorized: false,
            },
        },
        logging: false,
    });
} else {
    sequelize = new Sequelize(
        dbConfig.database,
        dbConfig.username,
        dbConfig.password,
        {
            host: dbConfig.host,
            dialect: dbConfig.dialect,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        }
    );
}


export default sequelize;
