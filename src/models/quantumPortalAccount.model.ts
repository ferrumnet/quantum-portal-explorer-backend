import mongoose, { Schema } from 'mongoose';
import { QuantumPortalAccount } from '../interfaces';

const quantumPortalAccountSchema = new Schema<Document & QuantumPortalAccount>({
  address: String,
  isContract: Boolean,
  isVerified: Boolean,
  name: String,
  // metadata: Object,
  hash: String,
  creator: String,
  token: Object,
  implementationAddress: String,
  implementationName: String,
  implementations: [
    {
      address: String,
      name: String,
    },
  ],
  contract: Object,
});

export const QuantumPortalAccountModel = mongoose.model<
  QuantumPortalAccount & Document
>('quantumPortalAccount', quantumPortalAccountSchema);
