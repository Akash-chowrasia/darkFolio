import expressPinoLogger from 'express-pino-logger';
import { isDevelopment } from './what-is-my-env';

const pinoOptions = {
  logger: Logger,
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      ...(isDevelopment ? { body: req.raw.body } : {}),
    }),
    res: (res) => ({
      statusCode: res.statusCode,
      body: res.raw.body,
    }),
  },
};

export const useHttpLogger = (app) => {
  app.use(expressPinoLogger(pinoOptions));
  Logger.debug('Pino Logger added');
};
