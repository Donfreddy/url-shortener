import express from 'express';
import { port } from './config';
import './db'; // initialize database
import redirect from './routes/redirect';
import url from './routes/url';

const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/url', url);
app.use('/', redirect);

app.listen(port, () => {
  console.log(`\n🚀 Server ready at http://localhost:${port}`);
});
