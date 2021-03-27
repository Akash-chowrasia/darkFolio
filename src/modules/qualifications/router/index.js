import { Router } from 'express';
import authMiddleware from '../../auth/service/middleware';
import httpHandler from '../../commons/http-handler';
import qualificationService from '../service';

const router = Router();

router.post(
  '/',
  authMiddleware.isLoggedIn,
  httpHandler(async (req, res) => {
    await qualificationService.addRecord(req.body);
    res.send('successfull');
  })
);

router.get(
  '/',
  httpHandler(async (req, res) => {
    const records = await qualificationService.fetchRecord();
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
