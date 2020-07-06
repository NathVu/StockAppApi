import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { test } from './test';
import { general } from "./General";
import { errorHandler } from "./middleware/error.middleware";
import {notFoundHandler} from "./middleware/notFound.middleware";
import { news } from "./news";
import { ticker } from "./tickers";
import { company } from "./company";
import bodyParser from 'body-parser';
dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 const apiKey: string = process.env.KEY as string;

 const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/test', test);
app.use('/general', general);
app.use('/news', news);
app.use('/ticker', ticker);
app.use('/company', company);
app.use(errorHandler);
app.use(notFoundHandler);

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}