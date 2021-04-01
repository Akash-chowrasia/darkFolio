import { Router } from 'express';
import authMiddleware from '../../auth/service/middleware';
import httpHandler from '../../commons/http-handler';
import skillService from '../service';

const router = Router();

router.post(
  '/',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { email } = req.user;
    const { name, rating } = req.body;
    await skillService.addRecord({ email, name, rating });
    res.send('added successfully');
  })
);

router.get(
  '/',
  httpHandler(async (req, res) => {
    const { email } = req.body;
    const records = await skillService.fetchRecord(email);
    res.send(records);
  })
);

router.put(
  '/:id',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
    await skillService.updateRating({ id, rating });
    res.send('successfull');
  })
);

router.delete(
  '/:id',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { id } = req.params;
    await skillService.removeRecord(id);
    res.send('successfull');
  })
);

export default router;
