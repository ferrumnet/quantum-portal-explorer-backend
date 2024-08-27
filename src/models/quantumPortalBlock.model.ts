import mongoose, { Schema } from 'mongoose';
import { quantumPortalBlockFinalizationSchema } from './quantumPortalBlockFinalization.model';

const quantumPortalBlockSchema = new Schema({
  hash: String,
  parentHash: String,
  number: Number,
  nonce: String,
  timestamp: String,
  difficulty: String,
  gasLimit: String,
  gasUsed: String,
  miner: String,
  baseFeePerGas: String,
  txCount: Number,
  rewards: [Object],
  txsFees: String,
  _difficulty: String,
});

export const QuantumPortalBlockModel = mongoose.model(
  'quantumPortalBlock',
  quantumPortalBlockSchema,
);
