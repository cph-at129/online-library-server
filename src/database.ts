import { Sequelize } from 'sequelize';

const database = new Sequelize({
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'bookstore',
    dialect: 'postgres',
    protocol:'postgres',
    port: 5432,
    storage: ':memory:',
    logging: false,
    define: {
        timestamps: false
    }
});

database.sync();

export { database };