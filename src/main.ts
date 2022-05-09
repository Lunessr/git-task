import * as express from 'express';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { router } from './modules/users/users.controller';
import * as bodyParser from 'body-parser';
import { tokenValidation } from './modules/middlewares/authMiddleware';

const server = express();
dotenv.config();

try {
  mongoose.connect(process.env.MONGO_URL);
  console.log('Connected to mongoDB');
} catch (error) {
  console.log(error);
}

server.use(bodyParser.json());
server.use(tokenValidation);
server.use(router);

server.get('/', (req: express.Request, res) => {
  res.send('<h1>Home page</h1>');
});

server.use((req, res) => {
  res.status(404).send('error');
});

server.listen(3000, () => {
  console.log(`Server started`);
});
