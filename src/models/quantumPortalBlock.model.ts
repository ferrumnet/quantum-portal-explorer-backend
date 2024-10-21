import mongoose, { Schema } from 'mongoose';
import { quantumPortalBlockFinalizationSchema } from './quantumPortalBlockFinalization.model';

const quantumPortalBlockSchema = new Schema({
  hash: String,
  parentHash: String,
  number: Number,
  nonce: String,
  timestamp: String,
  dateTimestamp: Date,
  difficulty: String,
  gasLimit: String,
  gasUsed: String,
  miner: String,
  baseFeePerGas: String,
  txCount: Number,
  rewards: [Object],
  txsFees: String,
  totalDifficulty: String,
});

export const QuantumPortalBlockModel = mongoose.model(
  'quantumPortalBlock',
  quantumPortalBlockSchema,
);
