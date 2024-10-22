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

      for (const doc of docs) {
        try {
          // Convert the string timestamp to a Date object
          const date = new Date(doc.timestamp);
          console.log(`Document ${doc._id} timestamp: ${doc.timestamp}`);
          if (date) {
            // Update the document with the new Date field
            await QuantumPortalBlockModel.updateOne(
              { _id: doc._id },
              { $set: { dateTimestamp: date } },
              { new: true },
            );
            console.log(`Document ${doc._id} updated successfully.`);
          } else {
            console.error(
              `Invalid date for document ${doc._id}: ${doc.timestamp}`,
            );
          }
        } catch (error) {
          console.error(`Error processing document ${doc._id}:`, error);
        }
      }
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

      for (const doc of docs) {
        try {
          // Convert the string timestamp to a Date object
          const date = new Date(doc.timestamp);
          console.log(`Document ${doc._id} timestamp: ${doc.timestamp}`);
          if (date) {
            // Update the document with the new Date field
            await QuantumPortalTransactionModel.updateOne(
              { _id: doc._id },
              { $set: { dateTimestamp: date } },
              { new: true },
            );
            console.log(`Document ${doc._id} updated successfully.`);
          } else {
            console.error(
              `Invalid date for document ${doc._id}: ${doc.timestamp}`,
            );
          }
        } catch (error) {
          console.error(`Error processing document ${doc._id}:`, error);
        }
      }
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
