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
  let aggregate: any = [];
  const query: any = {};
  if (queryData.fromDate && queryData.toDate) {
    query.$and = [
      { timestamp: { $gte: queryData.fromDate } },
      { timestamp: { $lte: queryData.toDate } },
    ];
  } else if (queryData.fromDate) {
    query.timestamp = queryData.fromDate;
  } else if (queryData.toDate) {
    query.timestamp = queryData.toDate;
  }
  if (Object.keys(queryData).length) {
    aggregate.push({
      $match: {
        ...query,
      },
    });
  }
  if (queryData.fromNetwork) {
    aggregate.push({
      $lookup: {
        from: 'quantumportaltransactions',
        localField: 'number',
        foreignField: 'block',
        pipeline: [
          {
            $match: {
              $and: [
                { method: 'finalize' },
                { 'decodedInput.parameters.value': queryData.fromNetwork },
                { 'decodedInput.parameters.name': 'remoteChainId' },
              ],
            },
          },
        ],
        as: 'result',
      },
    });
  }
  if (queryData?.page && queryData?.limit) {
    aggregate.push({
      $skip: (queryData.page - 1) * queryData.limit,
    });
    aggregate.push({
      $limit: queryData.limit,
    });
  }
  const docsPromise = await QuantumPortalBlockModel.aggregate(aggregate);

  const countPromise = QuantumPortalBlockModel.countDocuments(aggregate).exec();

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

export const getBlockBySourceChainId = async (
  chainId: string,
  blockNumber: number,
): Promise<number | undefined | any[]> => {
  const block = await QuantumPortalBlockModel.aggregate([
    {
      $match: {
        number: Number(blockNumber),
      },
    },
    {
      $lookup: {
        from: 'quantumportaltransactions',
        localField: 'number',
        foreignField: 'block',
        pipeline: [
          {
            $match: {
              $and: [
                { 'decodedInput.parameters.value': chainId },
                { 'decodedInput.parameters.name': 'remoteChainId' },
              ],
            },
          },
        ],
        as: 'result',
      },
    },
    {
      $unwind: '$transactions',
    },
    {
      $match: {
        'transactions.decodedInput.parameters.name': 'remoteChainId',
        'transactions.decodedInput.parameters.value': chainId,
      },
    },
  ]);

  return block.length ? block : undefined;
};
