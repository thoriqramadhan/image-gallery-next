import bcrypt from 'bcrypt';
const hashDigits = 10;


export const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, hashDigits);
        console.log(hashedPassword)
      return hashedPassword;
    } catch (error) {
      console.error('Hashing error:', error);
      throw new Error('Failed to hash password');
    }
};
export const comparePassword = async (password, passwordDb) => {
  return await bcrypt.compare(password , passwordDb)
 };