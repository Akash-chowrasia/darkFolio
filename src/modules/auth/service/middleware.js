import assert from 'assert';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import httpHandler from '~/helpers/http-handler';

const authMiddleware = {};

authMiddleware.isLoggedIn = httpHandler(async (req, res, next) => {
  assert(
    req.isAuthenticated(),
    createError(StatusCodes.UNAUTHORIZED, 'Need to login, dude')
  );
  next();
});

export default authMiddleware;
