import mongoose, { Schema } from 'mongoose';
import { quantumPortalBlockFinalizationSchema } from './quantumPortalBlockFinalization.model';

const quantumPortalBlockSchema = new Schema({
  hash: String,
  parentHash: String,
  number: Number,
  nonce: String,
  timestamp: Number,
  difficulty: Number,
  gasLimit: String,
  gasUsed: String,
  miner: String,
  extraData: String,
  transactions: [Object],
  baseFeePerGas: String,
  _difficulty: String,
});

export const QuantumPortalBlockModel = mongoose.model(
  'quantumPortalBlock',
  quantumPortalBlockSchema,
);
