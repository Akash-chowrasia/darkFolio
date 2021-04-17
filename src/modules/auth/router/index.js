import { Router } from 'express';
import passport from 'passport';
import authService from '../service';
import authMiddleware from '../service/middleware';
import httpHandler from '~/helpers/http-handler';

const router = Router();

router.post(
  '/register',
  httpHandler(async (req, res) => {
    await authService.registerUser(req.body);
    res.send({
      message: 'We have sent you a mail, please verify yourself through it',
    });
  })
);

router.post(
  '/login',
  passport.authenticate('local'),
  httpHandler(async (req, res) => {
    res.send(req.session.passport.user);
  })
);

router.post(
  '/verify',
  httpHandler(async (req, res) => {
    const { verification_code: verificationCode } = req.body;
    await authService.verifyEmail(verificationCode);
    res.send({ message: 'user verified successfully' });
  })
);

router.get(
  '/forgot-password',
  httpHandler(async (req, res) => {
    const { email, coaching_name } = req.body;
    await authService.handleForgotPassword({ email, coaching_name });
    res.send({
      message: 'We have sent you a mail, please reset your password through it',
    });
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
    res.send(req.session.passport.user);
  })
);

router.put(
  '/change-password',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { old_password, new_password } = req.body;
    await authService.changePassword({
      old_password,
      new_password,
      user: req.user,
    });
    res.send({ message: 'password changed successfully' });
  })
);

router.delete(
  '/logout',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    req.logout();
    res.send({ message: 'Logged Out' });
  })
);

export default router;
