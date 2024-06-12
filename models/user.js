const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt');

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
    const hashedPassword= await bcrypt.hash(password, 10);
    const query = {
      text: "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      values: [username, email,hashedPassword],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async createAccessToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, "secret_key", { expiresIn: '15m' });
  }

}

module.exports = new User();
