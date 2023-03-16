import { load } from 'cheerio';
import Quote from '../models/Quotes';
import Tag from '../models/Tags';
import { httpResponse } from './helper';

const WEB_BASE_URL = 'https://www.brainyquote.com';

interface QuoteInterface {
    quote: string;
    author: string;
}

const getContent = async (tag: string) => {
    const contentData = await httpResponse(`${WEB_BASE_URL}/topics/${tag}-quotes`);
    return contentData;
};

const readContent = (data: string) => {
    const $ = load(data);
    const quotes: QuoteInterface[] = [];
    $('.bqQt').each((i: number, el: any) => {
        const quote = $(el).find('.b-qt').text().trim();
        const author = $(el).find('.bq-aut').text();
        quotes.push({ quote, author });
    });
    return quotes;
};

const dataSaving = async (data: QuoteInterface[], tag: string) => {
    let taginstance = await Tag.findOne({ name: tag });

    if (!taginstance) {
        taginstance = await Tag.create({ name: tag });
    }
    for (const quote of data) {
        const existingQuote = await Quote.findOne({ content: quote.quote });
        if (!existingQuote) {
            const creatQuote = await Quote.create({
                content: quote.quote,
                author: quote.author,
                tags: taginstance._id,
            });
            console.log('quote added', creatQuote);
        }
    }
};

const brainQuoteWebScrapper = async (tag: string) => {
    const content = await getContent(tag);
    if (!content) console.log('No content');
    const contentRead = readContent(content);
    if (!contentRead || contentRead.length === 0) console.log('No data found');
    await dataSaving(contentRead, tag);
    console.log('WebScraper data is done');
};

export default brainQuoteWebScrapper;
