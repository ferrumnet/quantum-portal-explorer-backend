import { AbiItem } from 'web3-utils';

export interface QuantumPortalAccountBalance {
  tokenId: string;
  symbol: string;
  balanceRaw: string;
  balanceDisplay: string;
  price: string;
  currentValue: string;
}

export interface QuantumPortalContractAccount {
  address: string;
  network: string;
  abi: AbiItem;
  code: string;
  metadata: Object;
  contractId: string;
}

interface Implementations {
  address: string;
  name: string;
}

export interface QuantumPortalAccount {
  address: string;
  isContract: boolean;
  isVerified: boolean;
  token: object;
  hash: string;
  creator: string;
  name: string;
  // metadata: object;
  implementationAddress: string;
  implementationName: string;
  implementations: [Implementations];
  contract: { [k: string]: QuantumPortalContractAccount };
}
