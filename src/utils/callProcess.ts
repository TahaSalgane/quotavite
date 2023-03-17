import { CronJob } from 'cron';

const callProcess = () => {
    new CronJob(
        '* 1 * * *',
        () => {
            process && process.send && process.send?.('scrapper');
        },
        null,
        true,
        'Africa/Casablanca',
    );
};

callProcess();
