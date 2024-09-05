import bcrypt from 'bcrypt';
const hashDigits = 10;


export const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(toString(password), hashDigits);
        console.log(hashedPassword)
      return hashedPassword;
    } catch (error) {
      console.error('Hashing error:', error);
      throw new Error('Failed to hash password');
    }
  };