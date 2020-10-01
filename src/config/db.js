const { Pool } = require("pg")

module.exports = new Pool ({
    user: "renygrando",
    password: "renygrando",
    host: "localhost",
    port: 5432,
    database: "gymmanager"
})