
import express from 'express';
import { databaseConnection } from './model/database_connection';
import { router } from './router/routes';
import cookieParser from 'cookie-parser';

declare global{
    namespace Express{
      interface Request{
        id? : string
      }
    }
  }


const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/',router);
databaseConnection();


app.listen(3000,()=> console.log('server listening at port : 3000'))
