import assert from 'assert';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import md5 from 'md5';
import { nanoid } from 'nanoid';
import authModels from '../model';

const authService = {};

const genVerificationCode = async (email) => {
  const verificationCode = nanoid(50);
  await authModels.emailVerification.create({
    verification_code: verificationCode,
    email,
  });
  return verificationCode;
};

authService.registerUser = async (data) => {
  const hashedPassword = md5(data.password);
  const { email } = data;

  const emailExist = await authModels.user.findOne({ email }, { email });
  assert(
    emailExist === null,
    createError(StatusCodes.FORBIDDEN, 'This user already registered')
  );

  await authModels.user.create({ ...data, password: hashedPassword });

  return {
    verification_code: await genVerificationCode(email),
    status: true,
  };
};

authService.loginUser = async ({ email, password }) => {
  const user = await authModels.user.findOne({ email });
  assert(user !== null, createError(StatusCodes.BAD_REQUEST, 'Login Failed'));

  assert(
    md5(password) === user.password,
    createError(StatusCodes.UNAUTHORIZED, 'Incorrect Password')
  );

  return {
    user: user._id,
    status: true,
  };
};

authService.verifyEmail = async ({ verification_code, email }) => {
  const record = await authModels.emailVerification.findOne({
    verification_code,
  });

  assert(
    record !== null,
    createError(
      StatusCodes.BAD_REQUEST,
      'either you are verified or you entered a wrong verification code'
    )
  );

  await authModels.user.updateOne({ email }, { is_email_verified: true });

  await authModels.emailVerification.deleteOne({
    verification_code,
  });
};

authService.resetPasswordRequest = async (email) => {
  const token = nanoid(50);
  await authModels.resetPassword.create({ token, email });
  return token;
};

authService.resetPassword = async ({ token, new_password: newPassword }) => {
  const data = await authModels.resetPassword.findOne({ token });
  const { email } = data;
  const hashPassword = md5(newPassword);
  await authModels.user.updateOne({ email }, { password: hashPassword });
  await authModels.resetPassword.deleteOne({ token });
};

authService.changePassword = async ({
  old_password: oldPassword,
  new_password: newPassword,
  user_id: userId,
}) => {
  const user = await authModels.user.findById(userId);
  assert(
    md5(oldPassword) === user.password,
    createError(
      StatusCodes.UNAUTHORIZED,
      'Please enter the correct old password '
    )
  );
  const hashPassword = md5(newPassword);
  await authModels.user.findByIdAndUpdate(userId, { password: hashPassword });
};

authService.logoutUser = async (clientSession) => {
  await authModels.session.deleteOne({ session_id: clientSession });
};

export default authService;
