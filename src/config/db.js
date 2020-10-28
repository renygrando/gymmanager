const { Pool } = require("pg")
//utilizando banco de dados postgreesql
module.exports = new Pool ({
    user: "renygrando",
    password: "renygrando",
    host: "localhost",
    port: 5432,
    database: "gymmanager"
})