const config = require("../config/config");
const { Pool } = require("pg");

const pool = new Pool(
    config.database
)

module.exports=pool;
