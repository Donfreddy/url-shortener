import express from 'express';
import { port } from './config';
import './db'; // initialize database
import routes from './routes';

const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

// Routes
app.use('/api', routes);

app.listen(port, () => {
  console.log(`\n🚀 Server ready at http://localhost:${port}`);
});
