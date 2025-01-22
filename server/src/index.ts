import express from 'express';
import cors from 'cors';
import { streakRouter } from './routes/streak';
import { githubRouter } from './routes/githubauth';

const app = express();
app.use(express.json());

app.use(cors());
const PORT = 4000;


app.use('/api/v1', streakRouter);
app.use('/api/v1', githubRouter)



app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, () => {
  console.log(  `listening on *: ${PORT}`);
}); 

