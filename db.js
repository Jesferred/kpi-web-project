import Sequelize from 'sequelize';

export default new Sequelize('gigabase', 'postgres', '23022004', {
    host: 'localhost',
    dialect: 'postgres'
});
