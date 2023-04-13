import { AbiItem } from './index';

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

export interface QuantumPortalAccount {
  address: string;
  isContract: boolean;
  contract: { [k: string]: QuantumPortalContractAccount };
}
