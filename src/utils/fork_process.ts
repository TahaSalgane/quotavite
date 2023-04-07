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
            await brainQuoteWebScrapper('jealousy');
            await brainQuoteWebScrapper('motivational');
            await brainQuoteWebScrapper('positive');
            await brainQuoteWebScrapper('Life');
            await brainQuoteWebScrapper('Funny');
            await brainQuoteWebScrapper('Beauty');
            await brainQuoteWebScrapper('Attitude');
            await brainQuoteWebScrapper('Friendship');
            await brainQuoteWebScrapper('Alone');
            await brainQuoteWebScrapper('faith');
            await brainQuoteWebScrapper('Fear');
            await brainQuoteWebScrapper('travel');
            await brainQuoteWebScrapper('Truth');
            await brainQuoteWebScrapper('Intelligence');
            await brainQuoteWebScrapper('Amazing');
            await brainQuoteWebScrapper('Respect');
            await brainQuoteWebScrapper('Sports');

            //jealousy
            console.log('******************** scapper  end  ********************');
        }
    });
};

export default fokeProcess;
