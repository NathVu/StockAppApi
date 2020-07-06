import expressApp, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { exchanges } from '../data/exchanges';
import { GetQuoteParams, GetCandlesParams } from './types/tickersParams';
const request = require("request-promise");

const KEY: string = (process.env.KEY as string);

const tickerApp = expressApp();
tickerApp.get('/GetQuote', getQuoteRequest);
tickerApp.post('/GetCandles', getCandlesRequest);
export const ticker = tickerApp;

async function getQuoteRequest(req: Request, res: Response){
    try{
        let items: GetQuoteParams | null;
        let apikey = KEY;
        console.log(apikey);
        try {
            items = (req.body as GetQuoteParams);
        }
        catch (e){
            res.status(400).send('Bad Request');
            return;
        }
        var result = await request('https://finnhub.io/api/v1/quote?symbol=' + items.ticker + '&token=' + apikey, { json: true }, (err: any, res: any, body: { url: any; explanation: any; }) => {
            if (err) { return console.log(err); }
            });
        res.status(200).send(JSON.stringify(result));
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}


async function getCandlesRequest(req: Request, res: Response){
    try{
        let items: GetCandlesParams | null;
        let apikey = KEY;
        console.log(apikey);
        try {
            items = (req.body as GetCandlesParams);
            console.log(req);
        }
        catch (e){
            res.status(400).send('Bad Request');
            return;
        }
        var result = await request('https://finnhub.io/api/v1/stock/candle?symbol=' + items.symbol + '&resolution=' + items.resolution + '&from=' + items.from +'&to=' + items.to + '&token=' + apikey, { json: true }, (err: Error, res: any, body: any) => {
            if (err) { return console.log(err); }
          });
          
        res.status(200).send(JSON.stringify(result));
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}
