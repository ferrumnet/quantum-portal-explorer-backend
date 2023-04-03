import mongoose from 'mongoose';
import config from './config/config';
import app from './app';
import { NETWORK_SEEDED_DATA } from './utils/constants';
import { Networks } from './models';

mongoose
  .connect(config.mongoose.url)
  .then(async () => {
    console.info('Connected to MongoDB');
    const network = await Networks.find().countDocuments();
    if (network === 0) {
      await Networks.create(NETWORK_SEEDED_DATA);
    }
    const networks = await Networks.find();
    // console.log(networks);
    (global as any).network = networks;
  })
  .catch(err => {
    console.error(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`,
    );
  });

app.listen(config.port, () => {
  console.info(`Listening to port ${config.port}`);
});
