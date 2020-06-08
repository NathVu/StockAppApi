import expressApp, { Request, Response } from 'express';
const request = require("request-promise");
import * as dotenv from 'dotenv';

const apiKey: string = process.env.KEY as string;

const newsApp = expressApp();
newsApp.get('/', getGeneralNewsRequest);
newsApp.get('/companyNews', getCompanyNewsRequest);
export const news = newsApp;

async function getGeneralNewsRequest(req: Request, res: Response){
    try{
        console.log(apiKey);
        var result = await request('https://finnhub.io/api/v1/news?category=general&token=' + apiKey, { json: true }, (err: Error, res: any, body: any) => {
            if (err) { 
                res.status(500).send(err);
                return; 
            }
          });
        res.status(200).send(result);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
}

async function getCompanyNewsRequest(req: Request, res: Response){
    try{
        console.log("message recieved");
        let items = {
            message: "Hello from our new App!"
        }
        res.status(200).send(JSON.stringify(items));
    }
    catch (e) {
        res.status(404).send(e.message);
    }

}