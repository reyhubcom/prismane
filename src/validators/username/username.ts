/**
 * username
 * @param {string} value The value that should be validated
 * @returns {string | null}
 * @description Method that checks if a value is a valid username
 */
const username = (value: string): string | null => {
  if (!/^[a-z0-9_-]{4,255}$/.test(value)) {
    return "This is not a valid username!";
  }

  return null;
};

export default username;
