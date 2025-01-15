import express from 'express';
import cors from 'cors';
import { streakRouter } from './model/streak';

const app = express();
app.use(cors());
const PORT = 4000;


app.use('/api/v1/', streakRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, () => {
  console.log(  `listening on *: ${PORT}`);
}); 

