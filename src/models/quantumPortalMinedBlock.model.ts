import mongoose, { Schema } from 'mongoose';
import { quantumPortalBlockFinalizationSchema } from './quantumPortalBlockFinalization.model';
import { QuantumPortalMinedBlockDocument } from '../interfaces';

const quantumPortalMinedBlockSchema = new Schema<
  Document & QuantumPortalMinedBlockDocument
>({
  version: String,
  networkId: String,
  remoteNetworkId: String,
  nonce: Number,
  timestamp: Number,
  finalization: quantumPortalBlockFinalizationSchema,
  blockHash: String,
  minerId: String,
  stake: String,
  totalValue: String,
  transactionCount: String,
  // transactions: QuantumPortalRemoteTransactoin[]; // This should come from a join query
});

export const QuantumPortalMinedBlockModel = mongoose.model<
  QuantumPortalMinedBlockDocument & Document
>('quantumPortalMinedBlock', quantumPortalMinedBlockSchema);
