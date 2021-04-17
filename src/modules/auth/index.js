import { Router } from 'express';
import authRouter from './router';

const router = Router();
router.use('/auth', authRouter);

const authModule = {
  init: (app) => {
    app.use(router);
    Logger.debug('Auth module loaded');
  },
};

export default authModule;
