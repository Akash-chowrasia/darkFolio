import { Router } from 'express';
import experienceRouter from './router';

const router = Router();
router.use('/experience', experienceRouter);

const experienceModule = {
  init: (app) => {
    app.use(router);
    Logger.debug('Experience module loaded');
  },
};

export default experienceModule;
