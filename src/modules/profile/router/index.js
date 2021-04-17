import { Router } from 'express';
import authMiddleware from '~/modules/auth/service/middleware';
import httpHandler from '~/helpers/http-handler';
import profileService from '../service';

const router = Router();

router.post(
  '/',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { email } = req.user;
    const detail = req.body;
    await profileService.addRecord({ email, detail });
    res.send('successfull');
  })
);

router.get(
  '/',
  httpHandler(async (req, res) => {
    const { email } = req.body;
    const records = await profileService.getRecord(email);
    res.send(records);
  })
);

router.put(
  '/:id',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    await profileService.updateRecord({ id, data });
    res.send('successfull');
  })
);

export default router;
