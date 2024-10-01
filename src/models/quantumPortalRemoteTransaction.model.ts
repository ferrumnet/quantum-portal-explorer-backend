import mongoose, { Schema } from 'mongoose';
import { QuantumPortalRemoteTransaction } from '.././interfaces';

const quantumPortalRemoteTransactoinSchema = new Schema<
  Document & QuantumPortalRemoteTransaction
>({
  hash: String,
  networkId: String,
  remoteNetworkId: String,
  timestamp: Number,
  remoteContract: String,
  sourceMsgSender: String,
  sourceBeneficiary: String,
  tokenId: String,
  tokenSymbol: String,
  amountRaw: String,
  amountDisplay: String,
  method: String,
  gas: String,
  blockHash: String,
  blockIdx: Number,
});

export const QuantumPortalRemoteTransactionModel = mongoose.model<
  QuantumPortalRemoteTransaction & Document
>('quantumPortalRemoteTransactoin', quantumPortalRemoteTransactoinSchema);
