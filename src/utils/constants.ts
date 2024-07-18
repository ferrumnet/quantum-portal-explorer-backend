export const SUPPORTED_NETWORKS = [
  'RINKEBY',
  'BSC_TESTNET',
  'AVAX_TESTNET',
  'FERRUM_TESTNET',
];

export const NETWORK_SEEDED_DATA = {
  name: 'BSC',
  rpcUrl: 'https://bsc-dataseed.binance.org/',
};

export const isTransactionOrBlockHash = (addr: string) => {
  return /^0x([A-Fa-f0-9]{64})$/.test(addr);
};

export const COINPAPRIKA_API = `https://api.coinpaprika.com/v1/tickers/frm-ferrum-network`;

export const LEDGER_MANAGER_CONTRACT_ADDRESS =
  '0xe954e32daabfddb7d240d94b2e3e7868532eecd7';
export const MINER_ADDRESS = '0x50eCC1A45733Cd866066a4Db663dc8E2ce4115Fc';
