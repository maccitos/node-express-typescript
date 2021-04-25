import jwt from 'jsonwebtoken';
import ISanitized from '../../../../application/entities/users/ISanitized';
import config from '../../../../config/config';
import { encrypt } from './encrypt';

const createToken = async (data: ISanitized) => {
  return new Promise((resolve, reject) => {
    const { secretKey, tokenExpirations } = config;
    const expirationTime = tokenExpirations * 60000;
    const tokenData = { data: encrypt(JSON.stringify(data)) };
    jwt.sign(tokenData, secretKey, { expiresIn: expirationTime }, (err, token) => {
      return !err ? resolve(token) : reject(err);
    });
  });
};

export default createToken;
