import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';

export const notFoundHandler = (req, res, next) => {
  next(
    createError(StatusCodes.NOT_FOUND, `${req.originalUrl} route not found.`)
  );
};

export const errorHandler = (err, req, res, _next) => {
  res.status(err.statusCode || 500).send({
    message: err.message,
  });
};
