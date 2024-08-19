import { ethers } from 'ethers';
import * as blockService from './block.service';
import * as transactionsService from './transaction.service';
import config from '../config/config';

export const processBlockAndTransaction = async (
  startBlock: number,
  endBlock: number,
): Promise<any> => {
  for (let blockNumber = startBlock; blockNumber <= endBlock; blockNumber++) {
    try {
      const rpc = config.rpcUrl;
      const provider = new ethers.providers.JsonRpcProvider(rpc);
      // Fetch the block
      const block = await provider.getBlockWithTransactions(blockNumber);
      if (block) {
        await blockService.saveBlock(block);
        await Promise.all(
          block.transactions.map(async tx => {
            console.log(`  Transaction Hash: ${tx.hash}`);
            return {
              ...tx,
              valueToDisplay: ethers.utils.formatEther(tx.value),
              wait: await tx.wait(1),
            };
          }),
        );
        console.log('block.transactions.size:', block.transactions?.length);
        await transactionsService.saveTransactions(block.transactions);
      } else {
        console.log(`Block ${blockNumber} is empty`);
      }
    } catch (error) {
      console.error(`Error fetching block ${blockNumber}:`, error);
    }
  }
  return;
};
