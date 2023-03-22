import { QuantumPortalMinedBlockModel } from '../models';
import { QuantumPortalMinedBlockDocument } from '../interfaces';

export const getBlockByBlockHash = async (
  networkId: string,
  blockHash: string,
): Promise<QuantumPortalMinedBlockDocument> => {
  const block = await QuantumPortalMinedBlockModel.findOne({
    networkId,
    blockHash,
  });
  return block;
};

export const getBlockTxsByBlockHash = async (
  blockHash: string,
): Promise<any> => {
  const blocks = await QuantumPortalMinedBlockModel.find({ blockHash }).sort({
    timestamp: -1,
  });

  return blocks;
};

export const getRecentBlocks = async (
  page: number,
  limit: number,
): Promise<any> => {
  const blocks = await QuantumPortalMinedBlockModel.find()
    .sort({ timestamp: -1 })
    .skip(page * limit)
    .limit(limit);
  return blocks;
};
