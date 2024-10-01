import { CronJob } from 'cron';
import nodeSync from './nodeSync';

const nodeSyncJob = new CronJob(
  '*/1 * * * *',
  function () {
    nodeSync();
  },
  null,
  true,
);

const startJobs = () => {
  nodeSyncJob.start();
};
export default startJobs;
