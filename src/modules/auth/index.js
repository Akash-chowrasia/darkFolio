import authRouter from './router';

const authModule = {
  init: (app) => {
    app.use('/', authRouter);
    Logger.debug('Auth module loaded');
  },
};

export default authModule;
