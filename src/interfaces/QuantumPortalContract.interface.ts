import { AbiItem } from './index';

export interface QuantumPortalContractObject {
  contractId: string;
  contractName: string;
  sourceName: string;
  abi: AbiItem;
  bytecode: string;
  deployedBytecode: string;
}
