import mongoose, { Schema } from 'mongoose';
import { QuantumPortalAccount } from '../interfaces';

const quantumPortalAccountSchema = new Schema<Document & QuantumPortalAccount>({
  address: String,
  isContract: Boolean,
  contract: Object,
});

export const QuantumPortalAccountModel = mongoose.model<
  QuantumPortalAccount & Document
>('quantumPortalAccount', quantumPortalAccountSchema);
