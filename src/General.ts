import expressApp, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { GetTickerParams } from './types/GeneralParams';
import { exchanges } from '../data/exchanges';
const request = require("request-promise");

const apiKey: string = process.env.KEY as string;

const generalApi = expressApp();
generalApi.get('/GetTickers', GetAllTickers);
generalApi.get('/GetExchanges', GetAllExchanges);
export const general = generalApi;

async function GetAllTickers(req: Request, res: Response){
    try{
        let items: GetTickerParams | null;
        try {
            items = (req.body as GetTickerParams);
        }
        catch (e){
            res.status(400).send('Bad Request');
            return;
        }
        var result = await request('https://finnhub.io/api/v1/stock/symbol?exchange=' + items.exchange + '&token=' + apiKey, { json: true }, (err: Error, res: any, body: any) => {
            if (err) { return console.log(err); }
            console.log(body);
          });
        res.status(200).send(JSON.stringify(result));
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}

async function GetAllExchanges(req: Request, res: Response){
    try {
        var data = exchanges;
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}
