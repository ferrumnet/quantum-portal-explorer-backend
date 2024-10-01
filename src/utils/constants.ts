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

// export const COINPAPRIKA_API = `https://api.coinpaprika.com/v1/tickers/frm-ferrum-network`;
export const COINGECKO_API = `https://api.coingecko.com/api/v3/coins/ferrum-network`;

export const ContractAddresses = {
  QuantumPortalGateway: '0x42344220775e9A3A89534503d8eE4414e853476A',
  QuantumPortalState: '0xF7D3bB96D7cd9F7F257EA3653E40e66F7142Be55',
  QuantumPortalPoc: '0x72eD2f5c24069f0c3E1e5653f1178b58aa99d246',
  QuantumPortalLedgerMgr: '0xE954E32DaAbFdDB7D240D94b2e3E7868532eeCD7',
  QuantumPortalAuthorityMgr: '0x4AB3631B00F4C194649B3cA715E8e7C04E0275F2',
  QuantumPortalFeeConvertorDirect: '0x445CA01f9B834fCcd92AD496ffB40c3081763fD0',
  QuantumPortalMinerMgr: '0xd48757Ae2bE09E7b527009c96E0244d759374077',
  QuantumPortalStake: '0x635b5a8987A0aA38f668Fd788105A4d3EFc1E536',
  QuantumPortalMinStake: '0',
  QuantumPortalBtcWallet: '0xF3B61752E52B92BB0B8bF9eBb4FE487B8fD1047C',
  BTFDTokenDeployer: '0x30Da26Ec9F30EC79d43e04D2317eEd3A429fE000',
  Miner: '0x50eCC1A45733Cd866066a4Db663dc8E2ce4115Fc',
};
