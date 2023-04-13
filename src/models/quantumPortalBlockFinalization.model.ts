import { Schema } from 'mongoose';
import { QuantumPortalBlockFinalization } from '../interfaces';

export const quantumPortalBlockFinalizationSchema = new Schema<
  Document & QuantumPortalBlockFinalization
>({
  timestamp: Number,
  executorId: String,
  finalizedBlockHash: String,
  finalizerHash: String,
  totalBlockStake: String,
});
