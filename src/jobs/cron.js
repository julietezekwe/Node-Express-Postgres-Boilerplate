import cron from 'node-cron';

const cronjob = (time, func) => cron.schedule(time, func);

export default cronjob;
