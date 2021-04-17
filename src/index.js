import './helpers/logger';
import './helpers/init-db';

import { StatusCodes } from 'http-status-codes';
import {createApp, finishApp, useModules} from "~/app";

const app = createApp();

useModules.init(app);

app.get('/healthy', (req, res) => {
  res.sendStatus(StatusCodes.OK);
});

finishApp(app);

try {
  app.listen(Number(process.env.APP_PORT));
  Logger.info(`App Server started over ${process.env.APP_PORT}`);
} catch (err) {
  Logger.error(`Failed to start App Server over ${process.env.APP_PORT}`);
}
