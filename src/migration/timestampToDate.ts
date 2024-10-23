import mongoose from 'mongoose';
import config from '../config/config';
import {
  QuantumPortalBlockModel,
  QuantumPortalTransactionModel,
} from '../models';

const migrateTimestampsForBlocks = async () => {
  console.log('Blocks Migration started.');
  try {
    const docCount = await QuantumPortalBlockModel.countDocuments({
      dateTimestamp: { $exists: false },
    }).exec();
    const limit = 100;
    console.log(`Total documents to migrate: ${docCount}`);

    for (let page = 1; page <= Math.ceil(docCount / limit); page++) {
      console.log(`Processing page ${page} of ${Math.ceil(docCount / limit)}`);
      // Fetch all documents where dateTimestamp is not set
      const docs = await QuantumPortalBlockModel.find({
        dateTimestamp: { $exists: false },
      })
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();

      const updatedDocs = docs.map(doc => {
        const date = new Date(doc.timestamp);
        console.log(`Document ${doc._id} timestamp: ${doc.timestamp}`);
        if (date) {
          return {
            updateOne: {
              filter: { _id: doc._id },
              update: { $set: { dateTimestamp: date } },
            },
          };
        } else {
          console.error(
            `Invalid date for document ${doc._id}: ${doc.timestamp}`,
          );
        }
      });
      console.log(`Updating ${updatedDocs.length} documents...`);
      await QuantumPortalBlockModel.bulkWrite(updatedDocs);
    }
    console.log('Blocks Migration completed successfully.');
  } catch (err) {
    console.error('Error during migration:', err);
  }
};
const migrateTimestampsForTransactions = async () => {
  console.log('Transactions Migration started.');
  try {
    const docCount = await QuantumPortalTransactionModel.countDocuments({
      dateTimestamp: { $exists: false },
    }).exec();
    const limit = 100;
    console.log(`Total documents to migrate: ${docCount}`);

    for (let page = 1; page <= Math.ceil(docCount / limit); page++) {
      console.log(`Processing page ${page} of ${Math.ceil(docCount / limit)}`);
      // Fetch all documents where dateTimestamp is not set
      const docs = await QuantumPortalTransactionModel.find({
        dateTimestamp: { $exists: false },
      })
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
      const updatedDocs = docs.map(doc => {
        const date = new Date(doc.timestamp);
        console.log(`Document ${doc._id} timestamp: ${doc.timestamp}`);
        if (date) {
          return {
            updateOne: {
              filter: { _id: doc._id },
              update: { $set: { dateTimestamp: date } },
            },
          };
        } else {
          console.error(
            `Invalid date for document ${doc._id}: ${doc.timestamp}`,
          );
        }
      });
      console.log(`Updating ${updatedDocs.length} documents...`);
      await QuantumPortalTransactionModel.bulkWrite(updatedDocs);
    }
    console.log('Transactions Migration completed successfully.');
  } catch (err) {
    console.error('Error during migration:', err);
  }
};

mongoose
  .connect(config.mongoose.url)
  .then(async () => {
    console.info('Connected to MongoDB');
    migrateTimestampsForTransactions().then(() => {
      console.info('Transactions Migration completed.');
      migrateTimestampsForBlocks().then(() => {
        console.info('Blocks Migration completed.');
        mongoose.connection.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    console.error(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`,
    );
  });
