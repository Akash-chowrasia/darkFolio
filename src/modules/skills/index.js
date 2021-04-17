import { Router } from 'express';
import skillsRouter from './router';

const router = Router();

router.use('/skills', skillsRouter);

const skillsModule = {
  init: (app) => {
    app.use(router);
    Logger.debug('Skill module loaded');
  },
};

export default skillsModule;
