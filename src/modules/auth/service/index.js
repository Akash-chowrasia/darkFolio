import assert from 'assert';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import md5 from 'md5';
import { nanoid } from 'nanoid';
import {
  emailVerificationModel,
  forgotPasswordModel,
  userModel,
} from '../model';

const VERIFICATION_CODE_SIZE = 17;

const authService = {};

authService.registerUser = async (data) => {
  const { email, password } = data;

  const existingUser = await userModel.findOne({ email });

  assert(
    existingUser == null,
    createError(StatusCodes.FORBIDDEN, 'Already exists')
  );

  const hashedPassword = md5(password);

  await userModel.create({ ...data, password: hashedPassword });

  const verificationCode = nanoid(VERIFICATION_CODE_SIZE);
  await emailVerificationModel.create({
    verification_code: verificationCode,
    email,
  });
  Logger.debug(
    `Registration verification email is: ${verificationCode.toString()}`
  );
};

authService.loginUser = async ({ username, password }) => {
  const user = await userModel.findOne({ email: username });
  assert(user !== null, createError(StatusCodes.BAD_REQUEST, 'Login Failed'));

  assert(
    user.is_verified === true,
    createError(StatusCodes.UNAUTHORIZED, 'User is not verified')
  );

  assert(
    md5(password) === user.password,
    createError(StatusCodes.UNAUTHORIZED, 'Incorrect Password')
  );

  return user;
};

authService.verifyEmail = async (verificationCode) => {
  const record = await emailVerificationModel.findOne({
    verification_code: verificationCode,
  });

  assert(record !== null, createError(StatusCodes.BAD_REQUEST, 'Bad Request'));
  const { email } = record;
  await userModel.updateOne({ email }, { is_verified: true });

  await emailVerificationModel.deleteOne({
    verification_code: verificationCode,
  });
};

authService.handleForgotPassword = async (email) => {
  const user = await userModel.findOne({ email });
  assert(
    user != null,
    createError(StatusCodes.BAD_REQUEST, 'user Not Registered')
  );

  const token = nanoid(50);
  await forgotPasswordModel.create({ token, email });
  Logger.debug(`Reset token is: ${token.toString()}`);
};

authService.resetPassword = async ({ token, new_password: newPassword }) => {
  const record = await forgotPasswordModel.findOne({ token });
  assert(
    record !== null,
    createError(StatusCodes.NOT_ACCEPTABLE, 'cannot reset password ....')
  );
  const { email } = record;
  const hashPassword = md5(newPassword);
  await userModel.updateOne({ email }, { password: hashPassword });
  await forgotPasswordModel.deleteOne({ token });
};

authService.changePassword = async ({
  old_password: oldPassword,
  new_password: newPassword,
  user,
}) => {
  assert(
    md5(oldPassword) === user.password,
    createError(StatusCodes.UNAUTHORIZED, 'Invalid Password')
  );

  const hashPassword = md5(newPassword);
  await userModel.findByIdAndUpdate(user._id, { password: hashPassword });
};

authService.deleteUser = async ({
  user_id: userId,
  are_you_sure: areYouSure = false,
}) => {
  if (areYouSure) {
    return userModel.findByIdAndDelete(userId);
  }
  return userModel.findByIdAndUpdate(userId, { is_deleted: true });
};

export default authService;
