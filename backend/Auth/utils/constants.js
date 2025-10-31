/**
 * User Status Constants
 * These constants define the possible status values for users
 */
const USER_STATUS = {
  INACTIVE: 0,    // User account is inactive/disabled
  ACTIVE: 1,      // User account is active and can login
  SUSPENDED: 2    // User account is temporarily suspended
};

/**
 * Get status label from numeric value
 * @param {number} status - Numeric status value
 * @returns {string} Status label
 */
const getStatusLabel = (status) => {
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
};

/**
 * Get status value from label
 * @param {string} label - Status label
 * @returns {number} Numeric status value
 */
const getStatusValue = (label) => {
  const normalizedLabel = label.toLowerCase();
  switch(normalizedLabel) {
    case 'inactive':
      return USER_STATUS.INACTIVE;
    case 'active':
      return USER_STATUS.ACTIVE;
    case 'suspended':
      return USER_STATUS.SUSPENDED;
    default:
      throw new Error(`Invalid status label: ${label}`);
  }
};

/**
 * Check if status is valid
 * @param {number} status - Status value to validate
 * @returns {boolean} True if valid
 */
const isValidStatus = (status) => {
  return [USER_STATUS.INACTIVE, USER_STATUS.ACTIVE, USER_STATUS.SUSPENDED].includes(status);
};

/**
 * Check if user is active
 * @param {number} status - User status value
 * @returns {boolean} True if user is active
 */
const isActive = (status) => {
  return status === USER_STATUS.ACTIVE;
};

module.exports = {
  USER_STATUS,
  getStatusLabel,
  getStatusValue,
  isValidStatus,
  isActive
};
