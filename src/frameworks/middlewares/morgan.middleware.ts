import morgan, { StreamOptions } from 'morgan';
import Logger from '../common/helpers/winston';

const stream: StreamOptions = {
  write: (message) => {
    return Logger.info(message);
  },
};

const skip = () => {
  const env = process.env.NODE_ENV;
  return env !== 'development';
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

export default morganMiddleware;
