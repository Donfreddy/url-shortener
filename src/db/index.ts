import mongoose from 'mongoose';
import { db } from '../config';
const dbURI = `mongodb://${db.host}:${db.port}/${db.name}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

// Create the database connection
mongoose
  .connect(dbURI, options)
  .then(() => {
    console.log('Mongoose connection done');
  })
  .catch((e) => {
    console.log('Mongoose connection error');
    console.log(e);
  });
