import crypto from 'crypto';

const ALGORITHM = process.env.ALGORITHM || '';
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY || '', 'base64');
const IV_LENGTH = process.env.IV_LENGTH ? parseInt(process.env.IV_LENGTH, 10) : 16;

const getSHA1 = (text: string): string =>
  crypto.createHash('sha1').update(text).digest('hex').substr(0, 32);

const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = ENCRYPTION_KEY;
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (text: string): string => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts[0], 'hex');
  const encryptedText = Buffer.from(textParts[1], 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export { getSHA1, encrypt, decrypt };
