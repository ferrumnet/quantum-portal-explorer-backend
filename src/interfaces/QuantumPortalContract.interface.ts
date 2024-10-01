import { AbiItem } from './web3.interface';

export interface QuantumPortalContractObject {
  contractId: string;
  contractName: string;
  sourceName: string;
  abi: AbiItem;
  bytecode: string;
  deployedBytecode: string;
}
