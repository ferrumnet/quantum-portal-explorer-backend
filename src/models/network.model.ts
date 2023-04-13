import mongoose, { Schema } from 'mongoose';
import { Network } from '../interfaces';

const networkSchema = new Schema<Network>({
  name: String,
  rpcUrl: String,
});

export const Networks = mongoose.model('network', networkSchema);
