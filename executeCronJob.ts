import { CronJob } from 'cron';
import { AppDataSource } from "./data-source";
import CronJobEntity from "./src/entity/cronJob";
import Consumption from './src/entity/consumption';
import moment from 'moment';
import Report from './src/entity/report';

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
      if (cronJob.name === cronJobList.MONTHLY_REPORT) {
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

        const consumptions = await AppDataSource.getRepository(Consumption)
          .createQueryBuilder('consumption')
          .where('consumption.status=:status', { status: 0 })
          .andWhere('DATE(consumption.date) BETWEEN :startOfMonth AND :endOfMonth', { startOfMonth, endOfMonth })
          .getMany();

        const report = new Report();
        report.year = Number(moment().format('YYYY'));
        report.month = Number(moment().format('MM'));

        const content = {};
        let totalAmount = 0;
        for (const consumption of consumptions) {
          content[consumption.typeId] = (content[consumption.typeId] ?? 0) + consumption.amount;
          totalAmount += consumption.amount;
        }

        report.content = content;
        report.totalAmount = totalAmount;

        await AppDataSource.manager.save(report);

      } else {
        throw new Error(`cronJob ${cronJob.name} not found in code`);
      }
    });
    job.start();
  }
}