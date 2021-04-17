import apmModule from 'elastic-apm-node';

Logger.info(process.env.APM_SERVER_URL);
export const apmAgent = apmModule.start({
  serviceName: 'darkfolio-auth-api-service',
  serverUrl: process.env.APM_SERVER_URL,
  environment: 'production',
});
