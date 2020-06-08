import expressApp, { Request, Response } from 'express';

const testApp = expressApp();
testApp.get('/Hello', testHelloRequest);
export const test = testApp;

async function testHelloRequest(req: Request, res: Response){
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

