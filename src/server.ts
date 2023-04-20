import mongoose from 'mongoose';
import config from './config/config';
import app from './app';
import { QuantumPortalNetworkModel } from './models';

mongoose
  .connect(config.mongoose.url)
  .then(async () => {
    console.info('Connected to MongoDB');
    const networks = await QuantumPortalNetworkModel.find();
    (global as any).networks = networks;
  })
  .catch(err => {
    console.error(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`,
    );
  });

app.listen(config.port, () => {
  console.info(`Listening to port ${config.port}`);
});
