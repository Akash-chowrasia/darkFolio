import pino from 'pino';
import { isDevelopment } from './what-is-my-env';

const logger = pino({
  level: 'debug',
  ...(isDevelopment
    ? {
        prettyPrint: {
          colorize: true,
          translateTime: 'SYS:HH:MM:ss dd-mm-yyyy',
          ignore: 'pid,hostname',
        },
      }
    : {}),
});

global.Logger = logger;
