const pool = require("../services/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const config = require("../config/config");

class User {
  async findByEmail(email) {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows[0];
  }
  async findByUsername(username) {
    const query = {
      text: "SELECT * FROM users WHERE username = $1",
      values: [username],
    };
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows[0];
  }

  async registerUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    console.log(verificationToken);
    const query = {
      text: "INSERT INTO users (username, email, password, verification_token) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [username, email, hashedPassword, verificationToken],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async verifyUser(verificationToken) {
    const query = {
      text: "UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = $1 RETURNING *",
      values: [verificationToken],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async createAccessToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.tokens.accessTokenSecret, {
      expiresIn: "15m",
    });
  }
}

module.exports = new User();
