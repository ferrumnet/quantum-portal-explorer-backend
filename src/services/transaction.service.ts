import { QuantumPortalRemoteTransactoinModel } from '../models';
import {
  IGetTransactionResponse,
  QuantumPortalRemoteTransaction,
} from '../interfaces';

export const getRecentTxs = async (
  page: number,
  limit: number,
): Promise<IGetTransactionResponse> => {
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

export const getTransaction = async (
  txId: string,
): Promise<QuantumPortalRemoteTransaction> => {
  const tx = await QuantumPortalRemoteTransactoinModel.findOne({
    hash: txId,
  }).sort({
    timestamp: -1,
  });
  return tx;
};
