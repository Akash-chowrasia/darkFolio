import emailVerificationModel from './email-verification-model';
import resetPasswordModel from './reset-password-model';
import userModel from './user-model';
import authSession from './session-model';

const authModels = {
  emailVerification: emailVerificationModel,
  user: userModel,
  resetPassword: resetPasswordModel,
  session: authSession,
};

export default authModels;
