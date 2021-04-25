/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import CustomRoutes from './src/frameworks/web/routes/index.routes';
import errorMiddleware from './src/frameworks/middlewares/error.middleware';
import morganMiddleware from './src/frameworks/middlewares/morgan.middleware';
import config from './src/config/config';
import ErrorHandler from './src/frameworks/common/helpers/errors/error';
import passportConfig from './src/frameworks/middlewares/passport.middleware';
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passportConfig);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(morganMiddleware);
const routes = new CustomRoutes(app);
routes.createRoutes();
app.use(errorMiddleware);
mongoose.set('debug', true);
mongoose
  .connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`running on port ${port}`);
    });
  })
  .catch(() => {
    throw new ErrorHandler(500, 'Something went wrong');
  });

  module.exports = app;
