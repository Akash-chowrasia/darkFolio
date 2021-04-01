import emailVerificationModel from './email-verification-model';
import resetPasswordModel from './reset-password-model';
import userModel from './user-model';
import authSession from './session-model';
import logStoreModel from './user-log-model';

const authModels = {
  emailVerification: emailVerificationModel,
  user: userModel,
  resetPassword: resetPasswordModel,
  session: authSession,
  logStore: logStoreModel,
};

export default authModels;
