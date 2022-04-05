import * as express from 'express';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { router } from './modules/users/users.controller';

const server = express();
dotenv.config();

try {
  mongoose.connect(process.env.MONGO_URL);
  console.log('Connected to mongoDB');
} catch (error) {
  console.log(error);
}

server.listen(3000, (error) => {
  error ? console.log(error) : console.log('Server started');
});

server.get('/', (req, res) => {
  const title = 'Home page';
  res.send('<h1>Home page</h1>');
});

server.use(router);

server.use((req, res) => {
  const title = 'Error Page';
  res.status(404).send('error');
});
