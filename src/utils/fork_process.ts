import * as path from 'path';
import { fork } from 'child_process';
import { brainQuoteWebScrapper } from '../webScrapper/index';

const fokeProcess = () => {
    const childPath = path.resolve(__dirname + '/callProcess.js');

    const child = fork(childPath);

    child.on('message', async (message) => {
        if (message === 'scrapper') {
            console.log('******************** scapper start ********************');
            //
            await brainQuoteWebScrapper('love');
            //
            console.log('******************** scapper  end  ********************');
        }
    });
};

export default fokeProcess;
