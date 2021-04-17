import { Router } from 'express';
import profileRouter from './router';

const router = Router();
router.use('/profile', profileRouter);

const profileModule = {
  init: (app) => {
    app.use(router);
    Logger.debug('Profile module loaded');
  },
};

export default profileModule;
