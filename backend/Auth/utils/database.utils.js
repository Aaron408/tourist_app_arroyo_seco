const { pool } = require('../config/database');

/**
 * Database utilities for maintaining sequences and constraints
 */
class DatabaseUtils {
  /**
   * Fix Users table ID sequence
   * Creates or resets the sequence to the correct value
   */
  static async fixUsersSequence() {
    try {
      console.log('🔧 Checking Users table ID sequence...');

      // Check if sequence exists
      const sequenceCheck = await pool.query(`
        SELECT EXISTS (
          SELECT 1 FROM pg_sequences 
          WHERE schemaname = 'public' AND sequencename = 'Users_id_seq'
        ) as exists
      `);

      if (!sequenceCheck.rows[0].exists) {
        console.log('⚠️ Sequence does not exist, creating...');
        
        // Create sequence
        await pool.query('CREATE SEQUENCE "Users_id_seq"');
        
        // Get max ID and set sequence
        const maxIdResult = await pool.query('SELECT COALESCE(MAX(id), 0) as max_id FROM "Users"');
        const maxId = maxIdResult.rows[0].max_id;
        
        await pool.query(`SELECT setval('"Users_id_seq"', $1, false)`, [maxId + 1]);
        
        // Alter table to use sequence
        await pool.query('ALTER TABLE "Users" ALTER COLUMN id SET DEFAULT nextval(\'"Users_id_seq"\')');
        await pool.query('ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id');
        
        console.log('✅ Sequence created and configured');
      } else {
        // Sequence exists, sync it with current max ID
        const maxIdResult = await pool.query('SELECT COALESCE(MAX(id), 0) as max_id FROM "Users"');
        const maxId = maxIdResult.rows[0].max_id;
        
        await pool.query(`SELECT setval('"Users_id_seq"', $1, false)`, [maxId + 1]);
        
        console.log(`✅ Sequence synchronized (next ID: ${maxId + 1})`);
      }

      return true;
    } catch (error) {
      console.error('❌ Error fixing sequence:', error.message);
      return false;
    }
  }

  /**
   * Fix Session_Tokens table ID sequence
   */
  static async fixSessionTokensSequence() {
    try {
      console.log('🔧 Checking Session_Tokens table ID sequence...');

      const sequenceCheck = await pool.query(`
        SELECT EXISTS (
          SELECT 1 FROM pg_sequences 
          WHERE schemaname = 'public' AND sequencename = 'Session_Tokens_id_seq'
        ) as exists
      `);

      if (!sequenceCheck.rows[0].exists) {
        console.log('⚠️ Session_Tokens sequence does not exist, creating...');
        
        await pool.query('CREATE SEQUENCE "Session_Tokens_id_seq"');
        
        const maxIdResult = await pool.query('SELECT COALESCE(MAX(id), 0) as max_id FROM "Session_Tokens"');
        const maxId = maxIdResult.rows[0].max_id;
        
        await pool.query(`SELECT setval('"Session_Tokens_id_seq"', $1, false)`, [maxId + 1]);
        
        await pool.query('ALTER TABLE "Session_Tokens" ALTER COLUMN id SET DEFAULT nextval(\'"Session_Tokens_id_seq"\')');
        await pool.query('ALTER SEQUENCE "Session_Tokens_id_seq" OWNED BY "Session_Tokens".id');
        
        console.log('✅ Session_Tokens sequence created and configured');
      } else {
        const maxIdResult = await pool.query('SELECT COALESCE(MAX(id), 0) as max_id FROM "Session_Tokens"');
        const maxId = maxIdResult.rows[0].max_id;
        
        await pool.query(`SELECT setval('"Session_Tokens_id_seq"', $1, false)`, [maxId + 1]);
        
        console.log(`✅ Session_Tokens sequence synchronized (next ID: ${maxId + 1})`);
      }

      return true;
    } catch (error) {
      console.error('❌ Error fixing Session_Tokens sequence:', error.message);
      return false;
    }
  }

  /**
   * Initialize all database sequences
   */
  static async initializeSequences() {
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔧 Initializing Database Sequences');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const usersFixed = await this.fixUsersSequence();
    const tokensFixed = await this.fixSessionTokensSequence();
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (usersFixed && tokensFixed) {
      console.log('✅ All sequences initialized successfully');
    } else {
      console.log('⚠️ Some sequences could not be initialized');
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    
    return usersFixed && tokensFixed;
  }

  /**
   * Get next ID for a table (fallback method)
   */
  static async getNextId(tableName) {
    try {
      const result = await pool.query(
        `SELECT COALESCE(MAX(id), 0) + 1 as next_id FROM "${tableName}"`
      );
      return result.rows[0].next_id;
    } catch (error) {
      console.error(`Error getting next ID for ${tableName}:`, error);
      throw error;
    }
  }

  /**
   * Verify table structure
   */
  static async verifyTableStructure(tableName) {
    try {
      const result = await pool.query(`
        SELECT column_name, data_type, column_default, is_nullable
        FROM information_schema.columns
        WHERE table_name = $1 AND table_schema = 'public'
        ORDER BY ordinal_position
      `, [tableName]);

      console.log(`\n📋 Table Structure: ${tableName}`);
      console.log('─'.repeat(80));
      result.rows.forEach(col => {
        console.log(`  ${col.column_name.padEnd(20)} | ${col.data_type.padEnd(15)} | Default: ${col.column_default || 'none'}`);
      });
      console.log('─'.repeat(80));

      return result.rows;
    } catch (error) {
      console.error(`Error verifying table ${tableName}:`, error);
      throw error;
    }
  }
}

module.exports = DatabaseUtils;
