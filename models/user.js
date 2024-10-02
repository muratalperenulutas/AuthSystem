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

  async createAccessToken(user,refreshToken) {
    return jwt.sign(
      { id: user.id, refreshToken:refreshToken },
      config.tokens.accessTokenSecret,
      {
        expiresIn: "15m",
      }
    );
  }

  async handleRefreshToken(user) {
    async function createRefreshToken(user) {
      const refreshToken = jwt.sign(
        { id: user.id },
        config.tokens.refreshTokenSecret,
        { expiresIn: "7d" }
      );
      return refreshToken;
    }
    async function saveRefreshTokenToDb(refreshToken, userId) {
      const query = {
        text: "INSERT INTO refresh_tokens (refresh_token, expires_at, user_id) VALUES ($1, CURRENT_TIMESTAMP + INTERVAL '7 days', $2) RETURNING *",
        values: [refreshToken, userId],
      };
      const { rows } = await pool.query(query);
      console.log(rows);
      return rows[0];
    }
    const refreshToken = await createRefreshToken(user);

    await saveRefreshTokenToDb(refreshToken, user.id);

    return refreshToken;
  }
  async removeRefreshTokens(userId) {
    const query = {
      text: "DELETE FROM refresh_tokens WHERE user_id = $1",
      values: [userId],
    };

    const result = await pool.query(query);
    return result;
  }

  async getRefreshToken(id, refreshToken) {
    const query = {
      text: "SELECT * FROM refresh_tokens WHERE user_id = $1 AND refresh_token = $2",
      values: [id, refreshToken],
    };
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows[0];
  }
}

module.exports = new User();
