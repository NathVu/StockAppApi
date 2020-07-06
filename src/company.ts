import expressApp, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { exchanges } from '../data/exchanges';
import { GetQuoteParams, GetCandlesParams } from './types/tickersParams';
import { GetCompanyNewsParams, GetCompanyProfileParams } from './types/companyParams';
const request = require("request-promise");

const KEY: string = process.env.KEY as string;

const companyApp = expressApp();
companyApp.get('/GetNews', getNewsRequest);
companyApp.get('/GetCompanyProfile', getCompanyProfile);
export const company = companyApp;

async function getNewsRequest(req: Request, res: Response){
    try{
        let items: GetCompanyNewsParams | null;
        let apiKey = KEY;
        console.log(apiKey);
        try {
            items = (req.body as GetCompanyNewsParams);
            console.log(items);
        }
        catch (e) {
            res.status(400).send('Bad Request');
            return;
        }
        var result = await request('https://finnhub.io/api/v1/company-news?symbol=' + items.ticker + '&from=' + items.from + '&to=' + items.to + '&token=' + apiKey, { json: true }, (err: any, res: any, body: { url: any; explanation: any; }) => {
            if (err) { 
                console.log(err); 
                res.status(500).send('Something went wrong');
                return;
            }
        });
        console.log(result);
        res.status(200).send(JSON.stringify(result));
    }
    catch (e) {
        res.status(404).send(e.message);
    }
}

async function getCompanyProfile(req: Request, res: Response){
    try{
        let items: GetCompanyProfileParams | null;
        let apiKey = KEY;
        try{
            items = (req.body as GetCompanyProfileParams);
            console.log(items);
        }
        catch (e) {
            res.status(400).send('Bad Request');
            return;
        }
        var result = request('https://finnhub.io/api/v1/stock/profile2?symbol=' + items.ticker + '&token=' + apiKey, { json: true }, (err: any, res: any, body: { url: any; explanation: any; }) => {
            if (err) { 
                console.log(err); 
                res.status(500).send('Something went wrong');
                return;
            }
          });
          console.log(result);
        res.status(200).send(JSON.stringify(result));
    }
    catch (e) {
        res.status(404).send(e.message);
    }
}
