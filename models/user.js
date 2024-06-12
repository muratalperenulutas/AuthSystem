const pool = require("../config/database");

class User {
  async findByEmail(email) {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
    const { rows } = await pool.query(query);
    console.log(rows)
    return rows[0];
  }
  async registerUser(email, password) {
    const query = {
      text: "INSERT INTO users (email, password, isVerified) VALUES ($1, $2, $3) RETURNING *",
      values: [email, password, false],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

}

module.exports = new User();
