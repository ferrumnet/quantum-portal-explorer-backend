import { QuantumPortalRemoteTransaction } from './QuantumPortalRemoteTransaction.interface';

export interface QuantumPortalBlockFinalization {
  timestamp: number;
  executorId: string;
  finalizedBlockHash: string;
  finalizerHash: string;
  totalBlockStake: string;
}

export interface QuantumPortalMinedBlockDocument {
  version: string;
  networkId: string;
  remoteNetworkId: string;
  nonce: number;
  timestamp: number;
  finalization?: QuantumPortalBlockFinalization;
  blockHash: string;
  minerId: string;
  stake: string;
  totalValue: string;
  transactions: QuantumPortalRemoteTransaction[];
  transactionCount: number;
}

export interface IBlockListResponse {
  results: QuantumPortalMinedBlockDocument[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
