import { QuantumPortalRemoteTransactoinModel } from '../models';

export const getRecentTxs = async (
  page: number,
  limit: number,
): Promise<any> => {
  const docsPromise = QuantumPortalRemoteTransactoinModel.find()
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

export const getTransaction = async (txId: string): Promise<any> => {
  const tx = await QuantumPortalRemoteTransactoinModel.findOne({
    hash: txId,
  }).sort({
    timestamp: -1,
  });
  return tx;
};
