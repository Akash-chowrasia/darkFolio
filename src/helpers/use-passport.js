import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import connectRedis from 'connect-redis';
import expressSession from 'express-session';
import redis from 'redis';
import authService from '../modules/auth/service';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export const usePassport = (app) => {
  const RedisStore = connectRedis(expressSession);
  const redisClient = redis.createClient(process.env.REDIS_URL);

  app.use(
    expressSession({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        domain: process.env.SESSION_COOKIE_DOMAIN,
        maxAge: 24 * 60 * 60 * 1000, // 24 Hours
      },
    })
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password,  done) => {
        (async () => {
          try {
            const user = await authService.loginUser({ username, password });
            done(null, user);
          } catch (err) {
            done(err);
          }
        })();
      }
    )
  );

  app.use(passport.initialize({}));
  app.use(passport.session({}));
};
