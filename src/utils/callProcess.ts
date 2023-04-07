import { CronJob } from 'cron';

const callProcess = () => {
    new CronJob(
        '* 2 * * *',
        () => {
            process && process.send && process.send?.('scrapper');
        },
        null,
        true,
        'Africa/Casablanca',
    );
};

callProcess();
