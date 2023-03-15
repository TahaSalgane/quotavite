import { CronJob } from 'cron';

const callProcess = () => {
    new CronJob(
        '* * * * *',
        () => {
            process && process.send && process.send?.('scrapper');
        },
        null,
        true,
        'Africa/Casablanca',
    );
};

callProcess();
