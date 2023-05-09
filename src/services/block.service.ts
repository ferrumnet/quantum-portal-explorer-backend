import {
  QuantumPortalMinedBlockModel,
  QuantumPortalRemoteTransactoinModel,
} from '../models';
import {
  IGetBlocksResponse,
  IGetTransactionResponse,
  QuantumPortalMinedBlockDocument,
} from '../interfaces';

export const getBlockByBlockHash = async (
  networkId: string,
  blockHash?: string,
): Promise<QuantumPortalMinedBlockDocument> => {
  const filter: { networkId?: string; blockHash: string } = {
    blockHash: blockHash,
  };
  if (networkId) {
    filter.networkId = networkId;
  }
  const block = await QuantumPortalMinedBlockModel.findOne(filter);
  return block;
};

export const getBlockTxsByBlockHash = async (
  blockHash: string,
  page: number,
  limit: number,
): Promise<IGetTransactionResponse> => {
  const docsPromise = await QuantumPortalRemoteTransactoinModel.find({
    blockHash,
  })
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const countPromise =
    QuantumPortalRemoteTransactoinModel.countDocuments().exec();

  const [totalResults, results] = await Promise.all([
    countPromise,
    docsPromise,
  ]);
  const totalPages = Math.ceil(totalResults / limit);
  const result = {
    results,
    page,
    limit,
    totalPages,
    totalResults,
  };
  return result;
};

export const getRecentBlocks = async (
  page: number,
  limit: number,
): Promise<IGetBlocksResponse> => {
  const docsPromise = await QuantumPortalMinedBlockModel.find()
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const countPromise =
    QuantumPortalRemoteTransactoinModel.countDocuments().exec();

  const [totalResults, results] = await Promise.all([
    countPromise,
    docsPromise,
  ]);
  const totalPages = Math.ceil(totalResults / limit);
  const result = {
    results,
    page,
    limit,
    totalPages,
    totalResults,
  };
  return result;
};
