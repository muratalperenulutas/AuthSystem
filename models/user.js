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
  async findByUsername(username) {
    const query = {
      text: "SELECT * FROM users WHERE username = $1",
      values: [username],
    };
    const { rows } = await pool.query(query);
    console.log(rows)
    return rows[0];
  }

  async registerUser(username, email, password) {
    const query = {
      text: "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      values: [username, email,password],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

}

module.exports = new User();
