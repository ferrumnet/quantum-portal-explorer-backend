import mongoose, { Schema } from 'mongoose';
import { INetwork } from '../interfaces';

const networkSchema = new Schema<INetwork>({
  _id: String,
  name: String,
  rpcUrl: String,
});

export const QuantumPortalNetworkModel = mongoose.model(
  'quantumPortalNetwork',
  networkSchema,
);
