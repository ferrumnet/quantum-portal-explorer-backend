import { nodeService, blockService } from '../services';
import { ethers } from 'ethers';
import config from '../config/config';

const nodeSyncJob = async () => {
  const rpc = config.rpcUrl;
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const currentBlock = await provider.getBlockNumber();
  const lastVisitedBlock = await blockService.getLastBlockNumber();
  await nodeService.processBlockAndTransaction(lastVisitedBlock, currentBlock);
};
export default nodeSyncJob;
