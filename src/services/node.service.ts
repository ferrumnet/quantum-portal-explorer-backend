import axios from 'axios';
import * as blockService from './block.service';
import * as transactionsService from './transaction.service';
import config from '../config/config';

export const processBlockAndTransaction = async (
  startBlock: number,
  endBlock: number,
): Promise<any> => {
  console.log('node sync running', startBlock, endBlock);
  for (let blockNumber = startBlock; blockNumber <= endBlock; blockNumber++) {
    console.log(`Fetching block ${blockNumber}`);
    try {
      const url = config.explorerUrl;
      const block: any = await axios.get(`${url}/api/v2/blocks/${blockNumber}`);

      await blockService.saveBlock({
        hash: block.data.hash,
        parentHash: block.data.parent_hash,
        number: block.data.height,
        nonce: block.data.nonce,
        timestamp: block.data.timestamp,
        difficulty: block.data.difficulty,
        gasLimit: block.data.gas_limit,
        gasUsed: block.data.gas_used,
        miner: block.data.miner.hash,
        baseFeePerGas: block.data.base_fee_per_gas,
        txCount: block.data.tx_count,
        rewards: block.data.rewards,
        txsFees: block.data.tx_fees,
        totalDifficulty: block.data.total_difficulty,
      });
      console.log(`Block ${blockNumber} saved`);
      console.log(
        `Block ${blockNumber} has ${block?.data?.tx_count} transactions`,
      );
      if (block?.data?.tx_count > 0) {
        const txs = await axios.get(
          `${url}/api/v2/blocks/${blockNumber}/transactions`,
        );
        txs?.data?.items?.forEach(async (tx: any) => {
          console.log(`Fetching transaction ${tx.hash}`);
          const logs = await axios.get(
            `${url}/api/v2/transactions/${tx.hash}/logs`,
          );
          console.log(
            `Transaction ${tx.hash} has ${logs?.data?.items?.length} logs`,
          );
          const saved = await transactionsService.saveTransaction({
            hash: tx.hash,
            type: tx.type,
            blockNumber: tx.block,
            status: tx.status,
            method: tx.method,
            timestamp: tx.timestamp,
            from: tx?.from?.hash,
            fromDetails: tx?.from,
            to: tx?.to?.hash,
            toDetails: tx?.to,
            block: tx?.block,
            value: tx?.value,
            fee: tx?.fee?.value,
            gasLimit: tx?.gas_limit,
            gasUsed: tx?.gas_used,
            gasPrice: tx?.gas_price,
            inputData: tx?.raw_input,
            decodedInput: tx?.decoded_input,
            logs: logs?.data?.items,
            nonce: tx?.nonce,
            position: tx?.position,
            confirmations: tx?.confirmations,
            priorityFee: tx?.priority_fee,
            maxPriorityFeePerGas: tx?.max_priority_fee_per_gas,
            baseFeePerGas: tx?.base_fee_per_gas,
            maxFeePerGas: tx?.max_fee_per_gas,
          });
          console.log(`Transaction ${saved?.hash} saved`);
        });
      } else {
        console.log(`Block ${blockNumber} is empty`);
      }
    } catch (error) {
      console.error(`Error fetching block ${blockNumber}:`, error);
    }
  }
  return;
};
