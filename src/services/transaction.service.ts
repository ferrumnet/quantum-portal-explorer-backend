import { QuantumPortalRemoteTransactionModel } from '../models';
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
  const docsPromise = QuantumPortalRemoteTransactionModel.find(query)
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const countPromise =
    QuantumPortalRemoteTransactionModel.countDocuments(query).exec();

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
  const tx = await QuantumPortalRemoteTransactionModel.findOne({
    hash: txId,
  });
  return tx;
};

export const getAllTransactions = async (
  page: number,
  limit: number,
  queryData: any,
): Promise<ITransactionListResponse> => {
  const docsPromise = QuantumPortalRemoteTransactionModel.find(queryData)
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const countPromise = await QuantumPortalRemoteTransactionModel.countDocuments(
    queryData,
  ).exec();

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

export const getTransactionByQuery = async (
  query: Object,
): Promise<QuantumPortalRemoteTransaction> => {
  const tx = await QuantumPortalRemoteTransactionModel.findOne(query);
  return tx;
};
