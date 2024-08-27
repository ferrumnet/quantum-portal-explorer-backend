import {
  QuantumPortalBlockModel,
  QuantumPortalTransactionModel,
} from '../models';

export const saveBlock = async (block: any) => {
  const existedBlock = await getBlockByQuery({ number: block.number });
  if (existedBlock) {
    return existedBlock;
  }
  return await QuantumPortalBlockModel.create(block);
};

export const getBlockByBlockHash = async (blockHash: string): Promise<any> => {
  const filter: { hash: string } = {
    hash: blockHash,
  };

  const block = await QuantumPortalBlockModel.findOne(filter);
  return block;
};

export const getBlockByQuery = async (query: Object): Promise<any> => {
  const block = await QuantumPortalBlockModel.findOne(query);
  return block;
};

export const getBlockTxsByBlockHash = async (
  blockHash: string,
  page: number,
  limit: number,
): Promise<any> => {
  const docsPromise = await QuantumPortalTransactionModel.find({
    blockHash,
  })
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const countPromise = QuantumPortalTransactionModel.countDocuments().exec();

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
): Promise<any> => {
  const docsPromise = await QuantumPortalBlockModel.find()
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const countPromise = QuantumPortalTransactionModel.countDocuments().exec();

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
): Promise<any> => {
  const docsPromise = await QuantumPortalBlockModel.find(queryData)
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const countPromise = QuantumPortalBlockModel.countDocuments(queryData).exec();

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

export const getLastBlockNumber = async (): Promise<number | undefined> => {
  const lastBlock = await QuantumPortalBlockModel.find()
    .sort({ number: -1 })
    .limit(1)
    .exec();
  if (!lastBlock.length) {
    return;
  }
  return lastBlock[0].number;
};
