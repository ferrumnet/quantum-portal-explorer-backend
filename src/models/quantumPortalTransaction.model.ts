import mongoose, { Schema } from 'mongoose';

const quantumPortalTransactionSchema = new Schema({
  hash: String,
  type: Number,
  accessList: [Object],
  networkId: String,
  blockHash: String,
  blockNumber: Number,
  transactionIndex: Number,
  confirmations: Number,
  from: String,
  gasPrice: String,
  maxPriorityFeePerGas: String,
  maxFeePerGas: String,
  gasLimit: String,
  to: String,
  value: String,
  valueToDisplay: String,
  nonce: Number,
  data: String,
  r: String,
  s: String,
  v: Number,
  creates: String,
  chainId: Number,
  wait: String,
});

export const QuantumPortalTransactionModel = mongoose.model(
  'quantumPortalTransaction',
  quantumPortalTransactionSchema,
);
