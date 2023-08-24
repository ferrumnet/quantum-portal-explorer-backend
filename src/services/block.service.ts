import {
  QuantumPortalMinedBlockModel,
  QuantumPortalRemoteTransactionModel,
} from '../models';
import {
  IBlockListResponse,
  ITransactionListResponse,
  QuantumPortalMinedBlockDocument,
} from '../interfaces';

export const getBlockByBlockHash = async (
  blockHash: string,
  networkId?: string,
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

export const getBlockByQuery = async (
  query: Object,
): Promise<QuantumPortalMinedBlockDocument> => {
  const block = await QuantumPortalMinedBlockModel.findOne(query);
  return block;
};

export const getBlockTxsByBlockHash = async (
  blockHash: string,
  page: number,
  limit: number,
): Promise<ITransactionListResponse> => {
  const docsPromise = await QuantumPortalRemoteTransactionModel.find({
    blockHash,
  })
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const countPromise =
    QuantumPortalRemoteTransactionModel.countDocuments().exec();

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
): Promise<IBlockListResponse> => {
  const docsPromise = await QuantumPortalMinedBlockModel.find()
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const countPromise =
    QuantumPortalRemoteTransactionModel.countDocuments().exec();

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

export const getAllBlocks = async (
  page: number,
  limit: number,
  queryData: any,
): Promise<IBlockListResponse> => {
  const docsPromise = await QuantumPortalMinedBlockModel.find(queryData)
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const countPromise =
    QuantumPortalMinedBlockModel.countDocuments(queryData).exec();

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
