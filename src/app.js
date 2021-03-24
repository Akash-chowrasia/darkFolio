import express from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';

export const getAnApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  return app;
};

const notFoundHandler = (req, res, next) => {
  next(
    createError(StatusCodes.NOT_FOUND, `${req.originalUrl} route not found.`)
  );
};

const errorHandler = (err, req, res, _next) => {
  res.status(err.statusCode || 500).send({
    message: err.message,
  });
};

export const finishApp = (app) => {
  app.use(notFoundHandler);
  app.use(errorHandler);
};
