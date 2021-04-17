export const isProduction =
  'NODE_ENV' in process.env &&
  process.env.NODE_ENV.toLowerCase() === 'production';

export const isDevelopment =
  'NODE_ENV' in process.env === false ||
  process.env.NODE_ENV.toLowerCase() === 'development';
