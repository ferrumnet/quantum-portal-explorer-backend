import mongoose, { Schema } from 'mongoose';
import { QuantumPortalContractObject } from '../interfaces';

const quantumPortalContractObjectSchema = new Schema<
  Document & QuantumPortalContractObject
>({
  contractId: String,
  contractName: String,
  sourceName: String,
  abi: Object,
  bytecode: String,
  deployedBytecode: String,
});

export const QuantumPortalContractObjectModel = mongoose.model<
  QuantumPortalContractObject & Document
>('quantumPortalContractObject', quantumPortalContractObjectSchema);
