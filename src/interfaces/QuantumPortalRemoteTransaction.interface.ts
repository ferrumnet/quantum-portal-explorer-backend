export interface QuantumPortalRemoteTransaction {
  hash: string;
  networkId: string;
  remoteNetworkId: string; // Mined on this network
  timestamp: number;
  remoteContract: string;
  sourceMsgSender: string;
  sourceBeneficiary: string;
  tokenId: string;
  tokenSymbol: string;
  amountRaw: string;
  amountDisplay: string;
  method: string;
  gas: string;
  blockHash: string;
  blockIdx: number;
}

export interface ITransactionListResponse {
  results: QuantumPortalRemoteTransaction[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
