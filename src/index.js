import './modules/db';
import { finishApp, getAnApp } from './app';
import authModule from './modules/auth';
import skillsModule from './modules/skills';
import experienceModule from './modules/experiences';
import qualificationModule from './modules/qualifications';

const PORT = 2000;

const app = getAnApp();

const modules = [
  authModule,
  skillsModule,
  experienceModule,
  qualificationModule,
];

modules.forEach((module) => {
  module.init(app);
});

finishApp(app);

(async () => {
  try {
    await app.listen(PORT);
    console.log('-------   Server Started  ------');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
