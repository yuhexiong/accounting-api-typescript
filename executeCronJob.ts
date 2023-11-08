import { CronJob } from 'cron';
import moment from 'moment';
import { AppDataSource } from "./dataSource";
import ReportController from './src/controllers/reportController';
import CronJobEntity from "./src/entity/cronJob";

export enum cronJobList {
  MONTHLY_REPORT = 'monthlyReport',
}

export const executeCronJobs = async () => {
  const cronJobs = await AppDataSource.getRepository(CronJobEntity)
    .createQueryBuilder("cronJob")
    .where('status=:status', { status: 0 })
    .getMany();

  for (const cronJob of cronJobs) {
    const cronPattern = `${cronJob.seconds} ${cronJob.minutes} ${cronJob.hours} * * *`;
    const job = new CronJob(cronPattern, async () => {

      /* 計算上個月花費報表 */
      if (cronJob.name === cronJobList.MONTHLY_REPORT) {
        const lastMonth = moment().subtract(1, 'months').startOf('month');
        const year = Number(lastMonth.format('YYYY'));
        const month = Number(lastMonth.format('MM'));

        await ReportController.createReport(year, month);
      } else {
        throw new Error(`cronJob ${cronJob.name} not found in code`);
      }
    });
    job.start();
  }
}