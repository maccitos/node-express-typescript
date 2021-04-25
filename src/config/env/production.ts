// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const prodConfig = {
  db:
    process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || process.env.MONGODB_URI || '',
};

export default prodConfig;
