import { Router } from 'express';
import httpHandler from '../../commons/http-handler';
import authService from '../service';
import authMiddleware, {
  doesUserExist,
  isUserVerified,
} from '../service/middleware';
import sessionService from '../service/session-service';

const router = Router();

router.post(
  '/register',
  httpHandler(async (req, res) => {
    const details = req.body;
    const { verification_code: code } = await authService.registerUser(details);
    res.send({
      message: 'registered successful ',
      verification_code: code,
    });
  })
);

router.post(
  '/verify-user',
  doesUserExist,
  httpHandler(async (req, res) => {
    const { verification_code: verificationCode, email } = req.body;
    await authService.verifyEmail({
      verification_code: verificationCode,
      email,
    });
    res.send({ message: 'user verified successfully' });
  })
);

router.post(
  '/login',
  isUserVerified,
  httpHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user: userId } = await authService.loginUser({
      email,
      password,
    });
    const sessionId = await sessionService.genSession(userId);
    res
      .cookie('session_id', sessionId, { httpOnly: true })
      .send({ message: 'logged in' });
  })
);

router.get(
  '/reset-password-request',
  doesUserExist,
  httpHandler(async (req, res) => {
    const { email } = req.body;
    const token = await authService.resetPasswordRequest(email);
    res.send({ token });
  })
);

router.put(
  '/reset-password',
  httpHandler(async (req, res) => {
    const { token, new_password } = req.body;
    await authService.resetPassword({
      token,
      new_password,
    });
    res.send({ message: 'password changed successfully' });
  })
);

router.get(
  '/who-am-i',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { user } = req;
    res.send(user);
  })
);

router.put(
  '/change-password',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { old_password, new_password } = req.body;
    const userId = req.user._id;
    await authService.changePassword({
      old_password,
      new_password,
      user_id: userId,
    });
    res.send({ message: 'password changed successfully' });
  })
);

router.delete(
  '/logout',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const clientSession = req.cookies.session_id;
    await authService.logoutUser(clientSession);
    res.clearCookie('session_id').send({ message: 'logged out' });
  })
);

export default router;
