import express from 'express';
import { router } from './router/routes';
import { usewebsocket } from './controller/websocket';
import path from 'path';
const app = express();

app.use(express.static(path.resolve('./src/view')));
app.use('/', router);
usewebsocket();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
