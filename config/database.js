const { Pool } = require("pg");

const pool = new Pool(
    {
        user:'postgres',
        host:'localhost',
        database:'test',
        password:'murat',
        port:5432
    }
)

module.exports=pool;