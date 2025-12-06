module.exports = {
    DB: "database.sqlite",
    dialect: "sqlite",
    HOST: "localhost",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
