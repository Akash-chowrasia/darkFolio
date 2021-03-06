import { Router } from 'express';
import qualificationRouter from './router';

const router = Router();
router.use('/qualification', qualificationRouter);

const qualificationModule = {
  init: (app) => {
    app.use(router);
    Logger.debug('Qualification module loaded');
  },
};

export default qualificationModule;
