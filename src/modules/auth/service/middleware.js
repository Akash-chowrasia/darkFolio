import assert from 'assert';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import httpHandler from '../../commons/http-handler';
import authModels from '../model';
import sessionService from './session-service';
import userService from './user-services';

const authMiddleware = {};

authMiddleware.isLoggedIn = httpHandler(async (req, res, next) => {
  const clientSession = req.cookies.session_id;
  const record = await sessionService.getSession(clientSession);
  assert(
    record !== null,
    createError(StatusCodes.BAD_REQUEST, 'Please login first')
  );

  assert(
    record.session_id.toString() === clientSession.toString(),
    createError(StatusCodes.UNAUTHORIZED, 'invalid session')
  );

  req.user = await userService.getUserById(record.user_id);
  next();
});

export const doesUserExist = httpHandler(async (req, res, next) => {
  const { email } = req.body;
  const emailExist = await authModels.user.findOne({ email });
  assert(
    emailExist !== null,
    createError(StatusCodes.UNAUTHORIZED, 'This email is not registered')
  );
  next();
});

export const isUserVerified = httpHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await authModels.user.findOne({ email });
  assert(
    user !== null,
    createError(StatusCodes.BAD_REQUEST, 'This user does not exists')
  );
  assert(
    user.is_email_verified === true,
    createError(StatusCodes.UNAUTHORIZED, 'Please verify first')
  );
  next();
});

export default authMiddleware;
