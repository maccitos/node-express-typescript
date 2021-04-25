import passport from 'passport';
import Strategy from 'passport-local';
import { IUsers } from '../../application/entities/users/IUsers';
// import ErrorHandler from '../../frameworks/common/helpers/errors/error';

const LocalStrategy = Strategy.Strategy;

const local = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
  (req, username, password, cb) => {
    const user: IUsers = req.body?.user;
    const response: boolean = user.authenticate(password);
    return cb(null, response);
  }
);
passport.use(local);
