import axios from 'axios';
import { load } from 'cheerio';
import Quote from '../models/Quotes';

interface QuoteInterface {
    quote: string;
    author: string;
}

export const scrappAndInsertQuotes = async () => {
    const quotes: QuoteInterface[] = [];
    try {
        const response = await axios.get('https://www.brainyquote.com/topics/love-quotes');
        const cheerioLad = load(response.data);

        cheerioLad('.bqQt').each((i: number, el: any) => {
            const quote = cheerioLad(el).find('.b-qt').text().trim();
            const author = cheerioLad(el).find('.bq-aut').text();
            quotes.push({ quote, author });
        });
        // for (const quote of quotes) {
        //     const existingQuote = await Quote.findOne({ content: quote.quote });

        //     if (!existingQuote) {
        //         await Quote.insertOne(quote);
        //     }
        // }
        const addquote = await Quote.create({
            content: quotes[0].quote,
            author: quotes[0].author,
            tags: '640b0ef9752be73288df5e58',
        });

        console.log('quote added', addquote);
    } catch (Exception) {
        console.log(Exception);
    }
};

// const url = 'https://www.brainyquote.com/topics/love-quotes';
// axios
//     .get(url)
//     .then((response: AxiosResponse) => {
//         const cheerioLad = load(response.data);
//         const quotes: any[] = [];

//         cheerioLad('.bqQt').each((i: number, el: any) => {
//             const quote = cheerioLad(el).find('.b-qt').text().trim();
//             const author = cheerioLad(el).find('.bq-aut').text();
//             console.log(author);
//             quotes.push({ quote, author });
//         });
//         cron.schedule('1 * * * * *', () => {
//             console.log(quotes);
//         });
//     })
//     .catch((error: Error) => {
//         console.log(error);
//     });
// return responseData(res, true, 200, null, null);
