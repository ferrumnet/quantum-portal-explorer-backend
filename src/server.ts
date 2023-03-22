import mongoose from 'mongoose';
import config from './config/config';
import app from './app';

mongoose
  .connect(config.mongoose.url)
  .then(() => {
    console.info('Connected to MongoDB');
  })
  .catch(err => {
    console.error(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`,
    );
  });

app.listen(config.port, () => {
  console.info(`Listening to port ${config.port}`);
});
