import express, { Router } from 'express';
import cors from 'cors';
import { useHttpLogger } from '~/helpers/use-http-logger';
import { errorHandler, notFoundHandler } from '~/helpers/express-middlewares';
import { usePassport } from '~/helpers/use-passport';
import authModule from '~/modules/auth';
import experienceModule from '~/modules/experiences';
import profileModule from '~/modules/profile';
import qualificationModule from '~/modules/qualifications';
import skillsModule from '~/modules/skills';

const modules = [
  authModule,
  experienceModule,
  profileModule,
  qualificationModule,
  skillsModule,
];

export const createApp = () => {
  const app = express();
  app.use(
    cors({
      origin: new RegExp(process.env.CORS_REGEX),
      credentials: true,
    })
  );
  app.use(express.json());
  return app;
};

export const useModules = {
  init: (app) => {
    const router = Router();
    useHttpLogger(router);
    usePassport(router);
    modules.map((eachModule) => eachModule.init(router));
    app.use(process.env.URL_PREFIX, router);
  },
};

export const finishApp = (app) => {
  app.use(notFoundHandler);
  app.use(errorHandler);
};
