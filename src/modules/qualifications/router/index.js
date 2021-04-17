import { Router } from 'express';
import authMiddleware from '~/modules/auth/service/middleware';
import httpHandler from '~/helpers/http-handler';
import qualificationService from '../service';

const router = Router();

router.post(
  '/',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { email } = req.user;
    await qualificationService.addRecord({ email, detail: req.body });
    res.send('successfull');
  })
);

router.get(
  '/',
  httpHandler(async (req, res) => {
    const { email } = req.body;
    const records = await qualificationService.fetchRecord(email);
    res.send(records);
  })
);

router.put(
  '/:id',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { id } = req.params;
    const detail = req.body;
    await qualificationService.updateRecord({ id, detail });
    res.send('successfull');
  })
);

router.delete(
  '/:id',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { id } = req.params;
    await qualificationService.deleteRecord(id);
    res.send('successfull');
  })
);

export default router;
