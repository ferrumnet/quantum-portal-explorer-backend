import { QuantumPortalRemoteTransactoinModel } from '../models';
import {
  ITransactionListResponse,
  QuantumPortalRemoteTransaction,
} from '../interfaces';

export const getTxs = async (
  page: number,
  limit: number,
  address?: string,
): Promise<ITransactionListResponse> => {
  const query: any = {};
  if (address) {
    query.$or = [{ sourceMsgSender: address }, { remoteContract: address }];
  }
  const docsPromise = QuantumPortalRemoteTransactoinModel.find(query)
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const countPromise =
    QuantumPortalRemoteTransactoinModel.countDocuments(query).exec();

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
