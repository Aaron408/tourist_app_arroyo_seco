const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

/**
 * User Status Constants
 * @constant {number} STATUS_INACTIVE - User is inactive (0)
 * @constant {number} STATUS_ACTIVE - User is active (1)
 * @constant {number} STATUS_SUSPENDED - User is suspended (2)
 */
const USER_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
  SUSPENDED: 2
};

/**
 * User Model
 * Handles all database operations related to users and session tokens
 */
class UserModel {
  // Export constants
  static STATUS = USER_STATUS;
  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  static async create({ name, email, password }) {
    try {
      // Hash password with bcrypt (10 rounds)
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
        INSERT INTO "Users" (name, email, hashed_password, status)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, status
      `;
      
      const values = [name, email, hashedPassword, USER_STATUS.ACTIVE];
      const result = await pool.query(query, values);
      
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User or null
   */
  static async findByEmail(email) {
    try {
      const query = `
        SELECT id, name, email, hashed_password, status
        FROM "Users"
        WHERE email = $1
      `;
      
      const result = await pool.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} User or null
   */
  static async findById(id) {
    try {
      const query = `
        SELECT id, name, email, status
        FROM "Users"
        WHERE id = $1
      `;
      
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify password
   * @param {string} plainPassword - Plain text password
   * @param {string} hashedPassword - Hashed password from database
   * @returns {Promise<boolean>} True if password matches
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create session token
   * @param {number} userId - User ID
   * @param {string} token - JWT token
   * @param {string} expireDate - Token expiration date
   * @returns {Promise<Object>} Created session token
   */
  static async createSessionToken(userId, token, expireDate) {
    try {
      const query = `
        INSERT INTO "Session_Tokens" ("userID", token, expires_at)
        VALUES ($1, $2, $3)
        RETURNING id, "userID", token, expires_at
      `;
      
      const values = [userId, token, expireDate];
      const result = await pool.query(query, values);
      
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find session token by token string
   * @param {string} token - JWT token
   * @returns {Promise<Object|null>} Session token or null
   */
  static async findSessionToken(token) {
    try {
      const query = `
        SELECT id, "userID", token, expires_at
        FROM "Session_Tokens"
        WHERE token = $1
      `;
      
      const result = await pool.query(query, [token]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete session token (logout)
   * @param {string} token - JWT token
   * @returns {Promise<boolean>} True if deleted
   */
  static async deleteSessionToken(token) {
    try {
      const query = `
        DELETE FROM "Session_Tokens"
        WHERE token = $1
        RETURNING id
      `;
      
      const result = await pool.query(query, [token]);
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete all session tokens for a user
   * @param {number} userId - User ID
   * @returns {Promise<number>} Number of deleted tokens
   */
  static async deleteAllUserTokens(userId) {
    try {
      const query = `
        DELETE FROM "Session_Tokens"
        WHERE "userID" = $1
        RETURNING id
      `;
      
      const result = await pool.query(query, [userId]);
      return result.rowCount;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Clean expired tokens
   * @returns {Promise<number>} Number of deleted tokens
   */
  static async cleanExpiredTokens() {
    try {
      const query = `
        DELETE FROM "Session_Tokens"
        WHERE expires_at < $1
        RETURNING id
      `;
      
      const now = new Date().toISOString();
      const result = await pool.query(query, [now]);
      return result.rowCount;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user status
   * @param {number} userId - User ID
   * @param {number} status - New status (0=inactive, 1=active, 2=suspended)
   * @returns {Promise<Object>} Updated user
   */
  static async updateStatus(userId, status) {
    try {
      // Validate status value
      if (![USER_STATUS.INACTIVE, USER_STATUS.ACTIVE, USER_STATUS.SUSPENDED].includes(status)) {
        throw new Error('Invalid status value. Must be 0 (inactive), 1 (active), or 2 (suspended)');
      }

      const query = `
        UPDATE "Users"
        SET status = $1
        WHERE id = $2
        RETURNING id, name, email, status
      `;
      
      const result = await pool.query(query, [status, userId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if user is active
   * @param {number} status - User status value
   * @returns {boolean} True if user is active
   */
  static isActive(status) {
    return status === USER_STATUS.ACTIVE;
  }

  /**
   * Get status label
   * @param {number} status - User status value
   * @returns {string} Status label
   */
  static getStatusLabel(status) {
    switch(status) {
      case USER_STATUS.INACTIVE:
        return 'inactive';
      case USER_STATUS.ACTIVE:
        return 'active';
      case USER_STATUS.SUSPENDED:
        return 'suspended';
      default:
        return 'unknown';
    }
  }
}

module.exports = UserModel;
