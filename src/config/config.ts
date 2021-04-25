import all from './env/all';
import devConfig from './env/development';
import prodConfig from './env/production';

const enviroment = () => {
  const env = process.env.NODE_ENV;
  return env !== 'development';
};
const localConfig = enviroment() ? prodConfig : devConfig;

const config = {
  ...all,
  ...localConfig,
  tokenExpirations: process.env.TOKEN_EXP ? parseInt(process.env.TOKEN_EXP, 10) : 60,
  secretKey: process.env.SECRET_KEY || '',
  urlEnv: enviroment()
    ? process.env.PROD_URL
    : `${process.env.DEV_URL}:${process.env.PORT}`,
};

export default config;
