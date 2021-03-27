import { Router } from 'express';
import authMiddleware from '../../auth/service/middleware';
import httpHandler from '../../commons/http-handler';
import experienceService from '../service';

const router = Router();

router.post(
  '/',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    await experienceService.addRecord(req.body);
    res.send('successfully added');
  })
);

router.get(
  '/',
  httpHandler(async (req, res) => {
    const records = await experienceService.fetchRecord();
    res.send(records);
  })
);

router.put(
  '/:id',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { id } = req.params;
    const detail = req.body;
    await experienceService.updateRecord({ id, detail });
    res.send('successfull');
  })
);

router.delete(
  '/:id',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    const { id } = req.params;
    await experienceService.deleteRecord(id);
    res.send('successfull');
  })
);

export default router;
