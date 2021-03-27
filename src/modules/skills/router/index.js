import { Router } from 'express';
import authMiddleware from '../../auth/service/middleware';
import httpHandler from '../../commons/http-handler';
import skillService from '../service';

const router = Router();

router.post(
  '/',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { name, rating } = req.body;
    await skillService.addSkill({ name, rating });
    res.send('added successfully');
  })
);

router.get(
  '/',
  httpHandler(async (req, res) => {
    const records = await skillService.fetchSkill();
    res.send(records);
  })
);

router.put(
  '/',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { name, rating } = req.body;
    await skillService.updateRating({ name, rating });
    res.send('successfull');
  })
);

router.delete(
  '/',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { name } = req.body;
    await skillService.removeSkill(name);
    res.send('successfull');
  })
);

export default router;
