import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.sendFile('./src/view/index.html');
});



export { router };