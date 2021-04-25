// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const devConfig = {
  db: process.env.MONGODB_URI || '',
  app: {
    title: process.env.APP_TITLE,
    description: process.env.APP_DESCRIPTION,
    keywords: process.env.APP_KEYWORDS,
  },
};

export default devConfig;
