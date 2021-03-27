import { Router } from 'express';
import skillsRouter from './router';

const router = Router();

router.use('/skills', skillsRouter);

const skillsModule = {
  init: (app) => {
    app.use(router);
    console.log('Skills module loaded');
  },
};

export default skillsModule;
