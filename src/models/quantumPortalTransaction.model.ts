import mongoose, { Schema } from 'mongoose';

const quantumPortalTransactionSchema = new Schema({
  hash: String,
  type: Number,
  block: Number,
  nonce: Number,
  status: String,
  method: String,
  blockNumber: Number,
  confirmations: Number,
  from: String,
  fromDetails: Object,
  gasPrice: String,
  priorityFee: String,
  maxPriorityFeePerGas: String,
  baseFeePerGas: String,
  maxFeePerGas: String,
  gasLimit: String,
  gasUsed: String,
  to: String,
  toDetails: Object,
  value: String,
  chainId: Number,
  timestamp: String,
  fee: String,
  decodedInput: Object,
  logs: [Object],
});

export const QuantumPortalTransactionModel = mongoose.model(
  'quantumPortalTransaction',
  quantumPortalTransactionSchema,
);
